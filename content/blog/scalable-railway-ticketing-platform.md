---
title: "Building a Sharded Railway Ticketing Platform"
title_zh: "打造具實體分片的鐵路售票平台"
slug: "scalable-railway-ticketing-platform"
description: "A repository-backed draft on inventory correctness, waiting-room admission, single-writer fencing, and bounded online rebalancing in a Go ticketing platform."
description_zh: "依 repository 證據整理 Go 售票平台的 inventory correctness、waiting-room admission、single-writer fencing 與 bounded online rebalancing。"
date: "2026-08-01"
updated: "2026-08-01"
category: "Backend Systems"
tags: ["Backend Systems", "Go", "PostgreSQL", "Redis", "Sharding", "Observability"]
readingTime: "10"
status: draft
language: bilingual
cover: "/images/projects/scalable-railway-ticketing-platform.svg"
---

# Building a Sharded Railway Ticketing Platform

> Ticketing scale begins with correctness: the platform must preserve inventory ownership and write authority before it can make credible availability claims.

## Current repository scope

The [project page](/projects/scalable-railway-ticketing-platform) describes a Go backend that has progressed through reservation lifecycle work, hot-train admission control, segment-level inventory, multi-replica coordination, observability, and a fixed physical-shard topology.

The current topology is a bounded single-region pilot: one control database, two booking databases, Redis-backed coordination, background workers, and metrics. It is not an autoscaling, multi-region, or nationally certified production platform.

## Request and ownership flow

```text
Client
  |
  v
Go API
  |-- route lookup ----------> Control PostgreSQL
  |-- admission / quota -----> Redis
  |-- reservation write -----> Owning Booking Shard
  |-- metrics ---------------> Prometheus endpoint
  |
  +--> Workers: expiry, admission, reconciliation, migration
```

The routing layer decides which booking shard owns a train. The write path then checks the current authority and fencing state before mutating reservation data. This is more important than distributing reads: two writers must not both believe they own the same inventory.

## Inventory correctness

Rail tickets cover segments rather than a single undivided stock count. A seat available from station A to B may already be occupied from B to C. The repository models this through segment-level inventory and keeps reservation state changes inside database transactions.

The intended invariants are straightforward to state and difficult to preserve under concurrency:

- overlapping segments must not oversell the same seat;
- retries must not create duplicate reservations;
- expiry must release inventory once;
- quota and waiting-room admission must not bypass the reservation transaction;
- one authoritative writer must own a train during migration.

## Hot-train admission

Redis-backed quotas and waiting-room state protect the reservation path when one train becomes disproportionately popular. Admission is not the same as a confirmed seat. It only grants a bounded opportunity to enter the transactional reservation path.

This distinction keeps queue ordering, quota ownership, and booking correctness independently testable. It also avoids presenting waiting-room acceptance as a successful reservation.

## Online rebalancing

The migration workflow separates bulk copy, catch-up, verification, and cutover. The source remains writable during copy and catch-up, but the final authority transfer uses a bounded write pause and fencing. The design therefore claims online rebalancing with a bounded final pause, not zero-downtime migration.

There is no cross-shard XA or two-phase commit. Instead, the system constrains ownership so a train's booking writes have one authoritative shard at a time and provides reconciliation paths for incomplete work.

## Evidence boundaries

The repository contains tests, Compose topologies, Dockerfiles, metrics, and bounded local verification artifacts. Those support implementation and correctness claims within the documented environment. They do not establish:

- production passenger capacity or national-scale throughput;
- automatic shard expansion, failover, or multi-region operation;
- zero-downtime cutover;
- payment processing;
- disaster-recovery guarantees or a production SLO.

Synthetic local benchmark output is useful for regression work, but it is not production-capacity evidence and is not reproduced as a portfolio performance claim.

## 中文摘要

目前 repository 支持的是固定單區 pilot：control database、兩個 booking shards、Redis coordination、workers 與 metrics。核心重點是 segment inventory、idempotent reservation、waiting-room admission、single-writer fencing 與 bounded online rebalancing。Final cutover 仍需要有限 write pause，因此不宣稱 zero downtime；local tests 與 synthetic benchmark 也不代表 national-scale capacity、production SLO 或 disaster recovery 保證。

## Status

This is a draft engineering note grounded in the current public repository documentation. It avoids production-readiness and capacity claims that the available evidence does not establish.
