import { useState, useEffect } from "react"
import ProgressBar from "./progressBar"
import * as d3 from "d3"
import * as topojson from "topojson"
import Filter from "./filter"
import ca_data from "../data/CA.json"
import tx_data from "../data/TX.json"
import az_data from "../data/AZ.json"
import co_data from "../data/CO.json"
import merged_data from "../data/csvjson.json"

import styles from "./styles.module.css"
import MapModal from "./MapModal"

const defaultPeriod = { minYear: 1920, maxYear: 2019 }

function USMap() {
	const [selectState, setSelectState] = useState("Select State")
	const [selectPeriod, setSelectPeriod] = useState(defaultPeriod)
	const [progress, setProgress] = useState("")
	const [modalOpen, setModalOpen] = useState(false)
	const [modalData, setModalData] = useState({})
	const [county, setCounty] = useState("")

	const stateChangeHandler = value => {
		if (value === "ALL") {
			setSelectPeriod(defaultPeriod)
		} else if (value.includes("-")) {
			const [minYear, maxYear] = value.split("-")
			setSelectPeriod({
				minYear: +minYear.trim(),
				maxYear: +maxYear.trim(),
			})
		} else {
			setSelectState(value)
		}
	}

	const progressChangeHandler = curProgress => {
		setProgress(curProgress)
	}

	useEffect(() => {
		async function render() {
			let renderData
			if (
				selectState === "Select State" ||
				selectState === "United States"
			) {
				const mapData = await fetch(
					"https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json",
				).then(res => res.json())
				renderData = topojson.feature(
					mapData,
					mapData.objects.counties,
				).features
			}

			// console.log(renderData)

			if (selectState === "California") {
				renderData = topojson.feature(
					ca_data,
					ca_data.objects.cb_2015_california_county_20m,
				).features
			}

			if (selectState === "Texas") {
				renderData = topojson.feature(
					tx_data,
					tx_data.objects.cb_2015_texas_county_20m,
				).features
			}

			if (selectState === "Arizona") {
				renderData = topojson.feature(
					az_data,
					az_data.objects.cb_2015_arizona_county_20m,
				).features
			}

			if (selectState === "Colorado") {
				renderData = topojson.feature(
					co_data,
					co_data.objects.cb_2015_colorado_county_20m,
				).features
			}

			let spcimen_data

			// console.log(merged_data)

			if (progress === "") {
				spcimen_data = merged_data.filter(data => {
					if (!data.year || data.year < 1920 || data.year > 2019)
						return false

					return (
						data.year >= selectPeriod.minYear &&
						data.year <= selectPeriod.maxYear
					)
				})
			}

			if (progress !== "") {
				console.log(progress)
				const curMinYear = +progress.slice(0, -1)
				const curMaxYear = curMinYear + 9
				spcimen_data = merged_data.filter(
					data => data.year >= curMinYear && data.year <= curMaxYear,
				)
			}

			// console.log(spcimen_data)

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
					return handleCountyColor(d)
				})
				// .attr("stroke", "#ddd")
				// .attr("stroke-width", "0.2px")
				.on("mouseover", handleMouseOver)
				.on("mouseout", handleMouseOut)
				.on("click", handleMouseClick)

			function handleCountyColor(d) {
				const cnt = spcimen_data.filter(
					data =>
						+data.fips === d.id ||
						+data.fips === +d.properties.GEOID,
				).length
				if (cnt > 100) {
					return "Red"
				} else if (cnt > 20) {
					return "Yellow"
				} else if (cnt > 0) {
					return "Green"
				}
				return "Grey"
			}

			function filterCactusData(county) {
				let newData = spcimen_data.filter(d => d.county === county)
				console.log(newData)
				setModalData(newData)
			}

			function getCountyName(id) {
				const cactiData = spcimen_data.filter(data => +data.fips === id)
				if (cactiData.length > 0) {
					return cactiData[0].county
				}
				return "No Data Available"
			}

			function handleMouseClick(d, event) {
				console.log(d)
				console.log("event", event)
				if (!event.properties.NAME) {
					event.properties.NAME = getCountyName(event.id)
				}
				setCounty(event.properties.NAME)
				filterCactusData(event.properties.NAME)
				setModalOpen(true)
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
				const cactiData = spcimen_data.filter(data => +data.fips === x)

				if (!cactiData.length) return "No Data Available"
				return `${cactiData[0].county}, ${cactiData[0].stateProvince}<br>Samples: ${cactiData.length}`
			}

			function handleMouseOut(event, d) {
				d3.select(this).attr("stroke", "none")
				tooltip.style("visibility", "hidden")
			}

			// Begin legend stuff

			const texts = [
				{ text: "Sample > 100", color: "Red" },
				{ text: "Sample > 20", color: "YellowTitle" },
				{ text: "Sample > 0", color: "GreenTitle" },
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
	}, [selectState, selectPeriod, progress])

	return (
		<div id="container">
			<h1 id="title">United States Specimen Distribution Dashboard</h1>
			<div id="description">
				Plant Specimen collected by SEINet Dataset (1920-2019)
			</div>
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<ProgressBar
					progressChange={progressChangeHandler}
					min={"1920s"}
					max={"2010s"}
				/>

				<div className={styles.filterRoot}>
					<Filter
						title={"Select Time Period"}
						datas={[
							"ALL",
							"1920 - 1940",
							"1941 - 1960",
							"1961 - 1980",
							"1981 - 2000",
							"2001 - 2019",
						]}
						id="state"
						stateChange={stateChangeHandler}
						className={styles.filter}
						type="select"
					/>

					<Filter
						title={"Select State"}
						datas={[
							"United States",
							"California",
							"Texas",
							"Arizona",
							"Colorado",
						]}
						id="state"
						stateChange={stateChangeHandler}
						className={styles.filter}
						type="select"
					/>
				</div>
			</div>
			<div id="theChart"></div>
			<div id="theLegend"></div>
			<div>
				{modalOpen && (
					<MapModal
						setIsOpen={() => setModalOpen(false)}
						modalData={modalData}
						county={county}
					/>
				)}
			</div>
		</div>
	)
}

export default USMap
