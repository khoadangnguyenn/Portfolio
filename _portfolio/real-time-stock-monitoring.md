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

This small Java 8 and Maven service is built around design patterns. It polls two exchange feeds, HOSE and HNX, converts their different formats into one price type, and pushes every price to the viewers registered for that stock. The feeds are simulated, so it shows the architecture, not live market data.

The two Vietnamese exchanges return prices in their own shapes, yet an alert, a live price line and a periodic summary all want the same stream. The code keeps sources and consumers independent, so adding one touches little else.

Two patterns carry the design.

- Adapter: one adapter per exchange turns that exchange's data into the common price type behind a shared fetcher interface.
- Observer: a singleton feeder holds the stocks and the viewers of each stock code. It rejects a second viewer of the same kind per code and notifies the rest on each new price.

There are three viewers. The alert fires when the price crosses a high or low threshold, and only on the crossing, not on every tick. The real-time view logs a price when it changes. The ticker prints open, high, low, close, volume and average every 10 seconds. A fetch manager runs all fetchers once a minute.

The demo watches Vingroup (VIC) with a high and a low alert threshold. It fetches four HOSE and three HNX codes on a schedule.

Sample prices in a JSON file drive the feeds. Real-time use needs real exchange clients behind the same fetcher interface.
