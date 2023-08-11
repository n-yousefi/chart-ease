---
sidebar_position: 1
---

# Chart Ease

`<chart-ease>` is a lightweight and highly customizable **web component** designed for creating small and precise charts. With its ability to normalize data from any range to a specified size, chart-ease makes it easier than ever to represent data in an elegant and effective way. Whether you're creating a simple line graph or a complex scatterplot, chart-ease makes it easy to build and display your data in a clear and meaningful way.

## SVG rendering

Chart-Ease utilizes SVG (Scalable Vector Graphics) as the underlying technology for drawing charts. The choice of SVG for chart rendering is a deliberate decision made to achieve optimal performance and customization for the intended use cases.

### Why SVG?

SVG is particularly well-suited for rendering charts with a smaller number of objects or a larger surface area. This makes it an ideal choice for Chart-Ease, which aims to draw small charts quickly and with a high degree of customization. SVG's vector-based nature allows for smooth scaling of graphics without loss of quality, making it suitable for responsive and high-resolution displays.

On the contrary, Canvas exhibits better performance when working with a smaller surface area or a larger number of objects. It has performance advantages in specific scenarios that are not intended for us.
