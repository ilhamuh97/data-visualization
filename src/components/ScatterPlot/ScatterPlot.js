import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './ScatterPlot.scss'

const ScatterPlot = ({ data, setupData, dimensions, groupBy }) => {
    const svgRef = useRef(null);
    const [selectedData, setSelectedData] = useState(null);
    const [tempSelectedData, setTempSelectedData] = useState(null);
    const { width, height, margin } = dimensions;
    const svgWidth = width + dimensions.margin.left + margin.right;
    const svgHeight = height + margin.top + margin.bottom;
    const joinArr = JSON.stringify(setupData.groupBy);

    const getKeyTypeNumber = (d) => {
        const keys = Object.keys(d)
        return keys
    }

    console.log(selectedData)
    useEffect(() => {
        if (setupData.xAxis && setupData.yAxis && setupData.color) {
            // Create root container where we will append all other chart elements
            const svgEl = d3.select(svgRef.current);
            const stringLabel = getKeyTypeNumber(data[0]);
            svgEl.selectAll("*").remove(); // Clear svg content before adding new elements 
            const svg = svgEl
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            svg
                .append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("height", height)
                .attr("width", width)
                .attr("fill", "#222222")

            // Add X axis
            const scaleX = d3.scaleLinear()
                .domain([d3.min(data, d => d[setupData.xAxis]) * 0.5, d3.max(data, d => d[setupData.xAxis]) * 1.25])
                .range([0, width]);
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(scaleX).tickSize(-height));

            // Add Y axis
            const scaleY = d3.scaleLinear()
                .domain([d3.min(data, d => d[setupData.yAxis] * 0.5), d3.max(data, d => d[setupData.yAxis] * 1.25)])
                .range([height, 0]);
            svg.append("g")
                .call(d3.axisLeft(scaleY).tickSize(-width));

            // Add X axis label:
            svg.append("text")
                .attr("text-anchor", "end")
                .attr("x", width / 2 + margin.left)
                .attr("y", height + margin.top)
                .text(setupData.xAxis);

            // Y axis label:
            svg.append("text")
                .attr("text-anchor", "end")
                .attr("transform", "rotate(-90)")
                .attr("y", -margin.left + 20)
                .attr("x", -(height / 2 + -margin.left))
                .text(setupData.yAxis)

            // Tick Customization
            svg.selectAll(".tick line").attr("stroke", "#fff").attr("opacity", 0.1)
            // Oridnal Scale
            var shape = d3.scaleOrdinal()
                .domain(groupBy)
                .range([d3.symbolCircle, d3.symbolTriangle, d3.symbolSquare])

            // Color Scale
            var color = d3.scaleSequential().domain([d3.min(data, d => d[setupData.color]), d3.max(data, d => d[setupData.color])])
                .interpolator(d3.interpolatePuRd);

            var mouseover = function (e, d) {
                d3.selectAll(".dot").transition()
                    .duration(100).attr("opacity", 0.05)
                d3.select(this).transition()
                    .duration(100).attr("opacity", 1)
                setTempSelectedData(d);
            }

            var mouseclick = function (e, d) {
                setSelectedData(d)
            }

            var mouseleave = function (e, i) {
                d3.selectAll(".dot").transition()
                    .duration(100).attr("opacity", 0.7)
                setTempSelectedData(null);
            }

            var filterByGroup = function (d) {
                if (d["Origin"]) {
                    return setupData.groupBy.split("\t").indexOf(d["Origin"]) !== -1
                } else {
                    return setupData.groupBy.split("\t").indexOf(d["Herkunft"]) !== -1
                }
            }

            var filterByGroup2 = function (d) {
                if (setupData.filterText !== "") {
                    var founded = false;
                    const setDataArray = setupData.filterText.toLowerCase().split(",");
                    setDataArray.forEach((val) => {
                        if (val.trim() !== "") {
                            stringLabel.forEach(strLabel => {
                                if (d[strLabel].toString().toLowerCase().includes(val.trim())) {
                                    founded = true;
                                }
                            });
                        }

                    })
                    return founded
                } else {
                    return true
                }

            }

            // Add dots
            svg.append('g')
                .selectAll("dot")
                .data(data)
                .enter()
                .append("path")
                .filter(filterByGroup)
                .filter(filterByGroup2)
                .attr("d", d3.symbol()
                    .size(120)
                    .type(function (d) { return shape(d["Origin"]) })
                )
                .attr("transform", function (d) { return "translate(" + scaleX(d[setupData.xAxis]) + "," + scaleY(d[setupData.yAxis]) + ")"; })
                .attr("stroke", '#000')
                .attr("stroke-width", 0.5)
                .attr("fill", function (d) { return color(d[setupData.color]) })
                .attr("opacity", 0.7)
                .attr("class", function (d) { return "dot " + d["Origin"] })
                .on("mouseover", mouseover)
                .on("click", mouseclick)
                .on("mouseleave", mouseleave)
        }

    }, [setupData, data, width, height, margin, joinArr, groupBy])

    const card = (data, tempData) => {
        if (tempData) data = tempData
        if (data) {
            const keys = Object.keys(data);
            return (
                <ul>
                    {
                        keys.map((key) => {
                            return (
                                <li>
                                    <b>{key}: </b>
                                    <span>{data[key]}</span>
                                </li>
                            )
                        })
                    }
                </ul>
            )
        }

        return "";

    }

    return (
        <div className="scatter-plot-wrapper">
            <svg ref={svgRef} width={svgWidth} height={svgHeight} />
            <div>
                <h2>
                    Car Detail:
                </h2>
                {card(selectedData, tempSelectedData)}
            </div>
        </div>
    );
};

export default ScatterPlot;