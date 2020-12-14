import _ from 'lodash';
import React, { useRef, useLayoutEffect, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

function SankeyDiagram({ data }) {
    const chart = useRef(null);

    useEffect(() => {
        console.log(data)
    });

    useLayoutEffect(() => {
        let x = am4core.create("chartdiv", am4charts.SankeyDiagram);
        x.paddingRight = 150;
        x.data = [];

        let categories = _.uniq(_.map(data, 'Category'));
        for (let category of categories) {
            let totalPercentage = _.sumBy(data, (d) => {
                if (d.Category === category) {
                    x.data.push({"from": category, "to": d.Tag, "value": d.Percentage})
                    return d.Percentage
                } else {
                    return 0
                }
            })
            x.data.push({"from": "Desktop", "to": category, "value": totalPercentage})
        }

        x.dataFields.fromName = "from";
        x.dataFields.toName = "to";
        x.dataFields.value = "value";
        chart.current = x;
        return () => {
            x.dispose();
        };
    }, []);

    return (
        <div id="chartdiv" style={{width: "75%", height: "600px", margin: 'auto'}}/>
    );
}

export default SankeyDiagram;
