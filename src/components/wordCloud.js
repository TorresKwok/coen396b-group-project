import React, { useLayoutEffect, useRef } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

const WordCloud = ({ words }) => {
  const cloudRef = useRef(null);

  useLayoutEffect(() => {
    if (words.length > 0 && cloudRef.current) {
      const width = cloudRef.current.offsetWidth;
      const height = cloudRef.current.offsetHeight;

      const layout = cloud()
        .size([width, height])
        .words(words)
        .padding(5)
        .rotate(() => Math.random() < 0.5 ? 0 : 90)
        .fontSize(d => d.size)
        .on('end', draw);

      layout.start();

      function draw(words) {
        d3.select(cloudRef.current)
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', `translate(${width / 2}, ${height / 2})`)
          .selectAll('text')
          .data(words)
          .enter()
          .append('text')
          .style('font-size', d => `${d.size}px`)
          .style('fill', 'steelblue')
          .attr('text-anchor', 'middle')
          .attr('transform', d => `translate(${d.x}, ${d.y})rotate(${d.rotate})`)
          .text(d => d.text);
      }
    }
  }, [words]);

  return <div ref={cloudRef} style={{ width: '500px', height: '500px' }} />;
};

export default WordCloud;