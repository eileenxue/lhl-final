import React from "react";

export default function Booked(props) {
  return (
    <div>
    <h1>
<anychart>
  <charts>
    <chart plot_type="CategorizedHorizontal">
      <data>
        <series name="Dec 3rd, 2021" type="Web Development">
          <point name="Dec" y="A" />
          <point name="Jan" y="B" />
          <point name="Feb" y="C" />
          <point name="Feb" y="D" />
          <point name="Mar" y="E" />
        </series>
      </data>
      <chart_settings>
        <title>
          <text>Booked Exams</text>
        </title>
        <axes>
          <y_axis>
            <title>
              <text>Type</text>
            </title>
          </y_axis>
          <x_axis>
            <labels align="Outside" />
            <title>
              <text>Date</text>
            </title>
          </x_axis>
        </axes>
      </chart_settings>
    </chart>
  </charts>
</anychart>
       </h1>
    </div>
  );
}