import { useEffect } from "react"
import * as d3 from "d3"
import * as topojson from "topojson"

function USMap() {
	useEffect(() => {
		async function render() {
			const mapData = await fetch(
				"https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json",
			).then(res => res.json())

			const renderData = topojson.feature(
				mapData,
				mapData.objects.counties,
			).features

			const w = 1200
			const h = 600
			// const padding = 70

			// clear svg
			const chart = document.getElementById("theChart")
			if (chart) {
				chart.innerHTML = ""
			}

			const svg = d3
				.select("#theChart")
				.append("svg")
				.attr("width", w)
				.attr("height", h)
				.attr("align-self", "center")
			// .attr("transform", "scale(1, -1)")

			svg.selectAll("path")
				.data(renderData)
				.enter()
				.append("path")
				.attr("d", d3.geoPath())
				.attr("class", d => {
					// console.log(d)
					// return handleGetBachelors(d)
					return handleSNAPData(d)
				})
				// .attr("stroke", "#ddd")
				// .attr("stroke-width", "0.2px")
				.on("mouseover", handleMouseOver)
				.on("mouseout", handleMouseOut)

			function handleSNAPData(d) {
				return "Grey"
			}

			var tooltip = d3
				.select("#theChart")
				.append("div")
				.style("position", "absolute")
				.style("visibility", "hidden")
				.style("background-color", "#edf8c2")
				.style("color", "black")
				.style("border", "solid")
				.style("border-width", "0px")
				.style("border-radius", "15px")
				.style("padding", "10px")
				.style("box-shadow", "2px 2px 20px")
				.style("opacity", "0.85")
				.attr("id", "tooltip")

			function handleMouseOver(event, d) {
				d3.select(this).attr("stroke", "black")
				tooltip
					.style("visibility", "visible")
					.style("top", event.pageY - 40 + "px")
					.style("left", event.pageX + 10 + "px")
					.html(
						"<center> " +
							handleGetLocation(d.id || +d.properties.GEOID) +
							" </center>",
					)
			}

			function handleGetLocation(x) {
				// const node = filter_SNAP_data.find(
				// 	data => +data.fipsValue === x,
				// )
				// if (!node) return "No Data Available"
				// return `${node.County.substring(0, node.County.length - 7)}, ${
				// 	node.State === "California" ? "CA" : "TX"
				// }<br>Applications: ${node.SNAP_Applications}`
			}

			function handleMouseOut(event, d) {
				d3.select(this).attr("stroke", "none")
				tooltip.style("visibility", "hidden")
			}

			const texts = [
				{ text: "Type1", color: "Red" },
				{ text: "Type2", color: "YellowTitle" },
				{ text: "Type3", color: "GreenTitle" },
				{ text: "No data available", color: "GreyTitle" },
			]

			let legend = svg
				.append("g")
				.attr("transform", "translate(800, 300)")
				.attr("id", "legend")

			legend
				.selectAll("mydots")
				.data(texts.map(each => each.text))
				.enter()
				.append("circle")
				.attr("cx", 100)
				.attr("cy", function (d, i) {
					return 100 + i * 25
				}) // 100 is where the first dot appears. 25 is the distance between dots
				.attr("r", 7)
				.attr("class", (d, i) => texts[i].color)

			legend
				.selectAll("mylabels")
				.data(texts.map(each => each.text))
				.enter()
				.append("text")
				.attr("x", 120)
				.attr("y", function (d, i) {
					return 100 + i * 25
				}) // 100 is where the first dot appears. 25 is the distance between dots
				.attr("class", (d, i) => texts[i].color)
				.text(d => d)
				.attr("text-anchor", "left")
				.style("alignment-baseline", "middle")
				.style("font-size", "16px")
		}
		render()
	}, [])

	return (
		<div id="container">
			<h1 id="title">United States Specimen Distribution Dashboard</h1>
			<div id="description">-- SubTitle -- (1960-2020)</div>

			<div id="theChart"></div>
			<div id="theLegend"></div>
		</div>
	)
}

export default USMap
