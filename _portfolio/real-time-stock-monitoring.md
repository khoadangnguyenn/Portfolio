---
title: "Real-time stock monitoring"
tagline: "A Java console service that polls prices from two exchange feeds and notifies price alerts, a live view and a ticker."
collection: portfolio
when: "May 2025"
start: "2025-05"
end: "2025-05"
stack: [Java, Maven, org.json]
code: "https://github.com/khoadangnguyenn/Real-time-Stock-Monitoring-System"
card_summary: "A Java service that pulls stock prices from HOSE and HNX adapters and pushes them to alert, real-time and ticker views."
permalink: /portfolio/real-time-stock-monitoring/
---

This is a small Java 8 and Maven service built around design patterns: it polls two exchange feeds (HOSE and HNX), converts their different formats to one type, and pushes every price to the viewers registered for that stock. The feeds are simulated, so it demonstrates the architecture and not live market data.

## Problem

The two Vietnamese exchanges return prices in their own shapes, and several consumers (an alert, a live price line, a periodic summary) want the same stream. The code has to keep the sources and the consumers independent so that adding either one touches little else.

## What was built

- Adapter pattern: `HoseAdapter` and `HnxAdapter` implement `PriceFetcher` and convert `HoseData` and `HnxData` from `HosePriceFetchLib` and `HnxPriceFetchLib` into one `StockPrice`.
- Observer pattern: `StockFeeder`, a singleton, holds the stocks and a list of `StockViewer`s per stock code, rejects a second viewer of the same class for a code, and calls `notify` for each new price.
- Three viewers: `StockAlertView` fires when the price crosses a high or low threshold (only on the crossing, not on every tick), `StockRealtimePriceView` logs a price when it changes, and `StockTickerView` prints open, high, low, close, volume and average every 10 seconds.
- `PriceFetchManager` runs all fetchers on a scheduled executor once a minute.

## Results

`Main` watches Vingroup (VIC) with a high and a low alert threshold, and fetches four HOSE and three HNX codes on a schedule.

## Limits and next steps

The two exchange feeds are simulated from sample prices in `src/resources/stocks.json`. Real-time use needs real exchange clients behind the same `PriceFetcher` interface.
