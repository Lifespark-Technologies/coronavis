import * as L from 'leaflet';
import * as d3 from 'd3';
import { Overlay } from './overlay';
import {TooltipService} from '../../services/tooltip.service';
import { DiviAggregatedHospital } from 'src/app/services/divi-hospitals.service';
import { ColormapService } from 'src/app/services/colormap.service';
import {GlyphTooltipComponent} from '../../glyph-tooltip/glyph-tooltip.component';

export class AggregatedGlyphLayer extends Overlay {

  private gHospitals: d3.Selection<SVGGElement, DiviAggregatedHospital, SVGElement, unknown>;
  private map: L.Map;

  constructor(
    name: string,
    private data: DiviAggregatedHospital[],
    private tooltipService: TooltipService,
    private colormapService: ColormapService
  ) {
    super(name, null);
  }

  createOverlay(map: L.Map) {
    this.map = map;

    this.map.on('zoom', (e) => {
      this.onZoomed();
    });

    const locationPoints = this.data.map(d => this.map.latLngToContainerPoint(d.Location));
    const [xMin, xMax] = d3.extent(locationPoints, d => d.x);
    const [yMin, yMax] = d3.extent(locationPoints, d => d.y);

    const svgElement: SVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svgElement.setAttribute('viewBox', `${xMin} ${yMin} ${xMax - xMin} ${yMax - yMin}`);

    const rectSize = 10;

    const padding = 2;
    const yOffset = 10;

    this.gHospitals = d3.select(svgElement)
      .selectAll('g.hospital')
      .data<DiviAggregatedHospital>(this.data)
      .enter()
      .append<SVGGElement>('g')
      .attr('class', 'hospital')
      .attr('transform', d => {
        const p = this.map.latLngToLayerPoint(d.Location);
        return `translate(${p.x - ((3 * rectSize + padding * 3) / 2)}, ${p.y - (22 / 2)})`;
      })
      .on('mouseenter', d1 => {
        const evt: MouseEvent = d3.event;
        const t = this.tooltipService.openAtElementRef(GlyphTooltipComponent, { x: evt.clientX, y: evt.clientY });
        t.name = d1.Name;
      })
      .on('mouseout', () => this.tooltipService.close());



    this.gHospitals
      .append('rect')
      .attr('width', '50')
      .attr('height', '22')
      .attr('fill', 'white')
      .attr('stroke', '#cccccc');

    this.gHospitals
      .append('text')
      .text(d1 => d1.Name)
      .attr('x', padding)
      .attr('y', '8')
      .attr('font-size', '8px');

    this.gHospitals
      .append('rect')
      .attr('width', `${rectSize}px`)
      .attr('height', `${rectSize}px`)
      .attr('x', padding)
      .attr('y', yOffset)
      .style('fill', d1 => this.colormapService.getMaxColor(d1.icu_low_state));

    this.gHospitals
      .append('rect')
      .attr('width', `${rectSize}px`)
      .attr('height', `${rectSize}px`)
      .attr('y', yOffset)
      .attr('x', `${rectSize + padding * 2}px`)
      .style('fill', d1 => this.colormapService.getMaxColor(d1.icu_high_state));

    this.gHospitals
      .append('rect')
      .attr('width', `${rectSize}px`)
      .attr('height', `${rectSize}px`)
      .attr('y', yOffset)
      .attr('x', `${2 * rectSize + padding * 3}px`)
      .style('fill', d1 => this.colormapService.getMaxColor(d1.ecmo_state));


    // gHos
    //   .append('rect')
    //   .attr('width', '30px')
    //   .attr('height', '30px')
    //   .style('fill', d => colorScale(d.icuLowCare));
    //
    const latExtent = d3.extent(this.data, i => i.Location.lat);
    const lngExtent = d3.extent(this.data, i => i.Location.lng);

    const latLngBounds = new L.LatLngBounds([latExtent[0], lngExtent[0]], [latExtent[1], lngExtent[1]]);

    return L.svgOverlay(svgElement, [[latExtent[0], lngExtent[0]], [latExtent[1], lngExtent[1]]], {
      interactive: true,
      zIndex: 3
    });
    // return L.svgOverlay(svgElement, this.map.getBounds());
  }

  onZoomed() {
    // this.gHospitals
    //   .attr('transform', (d, i, n) => {
    //     const p = this.map.latLngToLayerPoint(d.Location);
    //     return `translate(${p.x}, ${p.y})`;
    //   });
    const zoom = this.map.getZoom();
    const scale = Math.pow(9 / (zoom), 4);

    console.log('zoomed', this.map.getZoom(), scale);

    this.gHospitals
      .selectAll('*')
      .transition()
      .duration(500)
      .attr('transform', d => {
        return `scale(${scale}, ${scale})`;
      });
  }
}