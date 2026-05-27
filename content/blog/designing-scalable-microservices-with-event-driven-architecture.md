---
title: "Designing Scalable Microservices with Event-Driven Architecture"
title_zh: "利用事件驅動架構設計高擴展性微服務"
slug: "designing-scalable-microservices-with-event-driven-architecture"
description: "An engineering note on service boundaries, event streams, idempotent consumers, and observability for cloud-native backend systems."
description_zh: "一篇工程筆記，整理雲原生後端系統中的服務邊界、事件流、冪等消費者與可觀測性設計。"
date: "2024-05-10"
updated: "2026-05-28"
category: "Architecture"
tags: ["Architecture", "Cloud Native", "Microservices", "Event Streams", "Observability"]
readingTime: "10"
status: draft
language: bilingual
cover: "/images/blog/coding.jpg"
---

# Designing Scalable Microservices with Event-Driven Architecture

> Event-driven architecture helps a backend absorb uneven workloads by moving non-blocking work out of synchronous request chains.

## Overview

This article is an engineering note, not a case study about a large production rollout. It records how I reason about microservice boundaries, event streams, and reliability when designing cloud-native backend systems.

The focus is practical: which work should stay in the request path, which work should become asynchronous, and what has to be observable before the design is maintainable.

## Engineering Context

REST APIs are a good default for direct commands: create an order, update a profile, request a report, or trigger an admin action. The trouble starts when one request silently becomes a chain of service-to-service calls.

In a checkout-like workflow, the order service may need inventory, payment, notification, analytics, and telemetry updates. If each step is synchronous, the slowest dependency shapes the user experience and the most fragile dependency shapes reliability.

Event-driven design is useful when downstream work is important but does not need to block the original command. It fits notification delivery, audit trails, analytics ingestion, derived read models, telemetry processing, and integration with external workers.

## Architecture / Pipeline

The pipeline separates command handling from event reaction:

```text
Client / Admin / Worker
        |
        v
API Gateway
        |
        v
Command Service
  - validate request
  - write local state
  - append outbox event
        |
        v
Outbox Publisher -> Event Bus -> Consumers
                              -> Notification Worker
                              -> Inventory Worker
                              -> Analytics Worker
                              -> Telemetry Worker
```

The command service owns the decision. Consumers own their side effects. The event bus connects them without requiring every consumer to be healthy during the original request.

## Implementation Notes

### Event Envelope

Events should be boring and explicit:

```json
{
  "event_id": "evt_01HZ...",
  "event_type": "order.created",
  "event_version": 1,
  "occurred_at": "2026-05-28T09:30:00Z",
  "producer": "order-service",
  "correlation_id": "req_01HZ...",
  "aggregate": {
    "type": "order",
    "id": "ord_123"
  },
  "payload": {
    "user_id": "usr_456",
    "items": [
      { "sku": "sku_1", "quantity": 2 }
    ]
  }
}
```

The `event_id` supports idempotency. The `correlation_id` connects logs and traces. The `event_version` gives consumers a safe migration path when payloads change.

### Outbox Write

The outbox pattern keeps business data and event intent in the same local transaction:

```ts
async function createOrder(command: CreateOrderCommand) {
  return db.transaction(async (tx) => {
    const order = await tx.orders.insert({
      userId: command.userId,
      status: 'pending',
      total: command.total
    })

    await tx.outbox.insert({
      eventId: crypto.randomUUID(),
      eventType: 'order.created',
      aggregateId: order.id,
      payload: JSON.stringify({ orderId: order.id })
    })

    return order
  })
}
```

This does not solve distributed consistency by magic. It narrows the dangerous part to one database transaction and makes delayed event publication visible.

### Consumer Idempotency

Consumers should expect duplicate delivery:

```ts
async function handleOrderCreated(event: EventEnvelope) {
  const seen = await db.processedEvents.exists(event.event_id)
  if (seen) return

  await db.transaction(async (tx) => {
    await reserveInventory(tx, event.payload.items)
    await tx.processedEvents.insert({ eventId: event.event_id })
  })
}
```

The exact storage can be a processed-event table, deterministic business key, or idempotency key passed to an external API.

## Design Decisions

| Decision | Preferred direction | Why |
| --- | --- | --- |
| Command path | Keep validation and core state writes synchronous. | The caller needs a clear success or failure response. |
| Event payload | Publish facts, not instructions. | Consumers can evolve without the producer knowing every workflow. |
| Event schema | Add versions early. | Schema changes are easier before consumers multiply. |
| Retry policy | Use bounded retry and dead-letter queues. | Infinite retry hides broken payloads and blocks useful work. |
| Observability | Log correlation IDs everywhere. | Async workflows need traceable joins across services. |

## Trade-offs

Event-driven architecture reduces request coupling, but it introduces delayed consistency. Users may see an order created before notification delivery or analytics updates complete.

It also moves complexity from code paths into operations. Teams need dashboards for consumer lag, outbox age, retry rate, and dead-letter volume.

The design is worthwhile when asynchronous work is frequent, slow, bursty, or owned by separate services. It is unnecessary overhead for a small feature with one database and one team boundary.

## Failure Modes & Debugging

Common failure modes:

- Outbox publisher is down, so events are recorded but not emitted.
- A consumer processes an event twice and creates duplicate side effects.
- A schema change breaks older consumers.
- A poison message retries forever.
- Consumer lag grows silently during a traffic spike.

Debugging should start from the `correlation_id`, then follow the outbox row, broker offset, consumer logs, and side-effect state.

## Deployment / Integration Notes

A safe event-schema rollout usually happens in stages:

1. Deploy consumers that tolerate both old and new fields.
2. Deploy producers that emit the new event version.
3. Watch error rate, retry count, and dead-letter volume.
4. Remove compatibility only after old events no longer matter.

For CI/CD, I would add contract tests for event payloads, integration tests for idempotent consumers, and smoke checks that verify the outbox publisher can reach the broker.

<!-- TODO: add configuration example -->
<!-- TODO: add deployment note -->

## Lessons Learned

The hardest part is not adding a message broker. The hard part is deciding which service owns which decision, which event is a durable contract, and which failure can be safely retried later.

For my cloud-native backend work, this pattern connects service design, container deployment, CI/CD, observability, and production incident response into one system-design habit.

## Next Steps

The next version should include a small runnable reference implementation with a database outbox, one broker, two consumers, and an OpenTelemetry trace across the full flow.

<!-- TODO: add architecture diagram -->
<!-- TODO: add benchmark only if real data is available -->

## Notes

This note intentionally avoids throughput or latency claims. Benchmarks should only be added from a reproducible implementation and real measurement logs.
