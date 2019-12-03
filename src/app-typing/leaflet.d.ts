import * as L from 'leaflet';

import {Layer} from 'leaflet';
declare module "leaflet" {



  export class SVGOverlay extends Layer {
  constructor(el: string | string[] | SVGElement, bounds: L.LatLngBoundsExpression, options?: L.ImageOverlayOptions);
    setOpacity(opacity: number): this;
    bringToFront(): this;
    bringToBack(): this;
    setUrl(url: string): this;

    /** Update the bounds that this VideoOverlay covers */
    setBounds(bounds: L.LatLngBounds): this;

    /** Get the bounds that this VideoOverlay covers */
    getBounds(): L.LatLngBounds;

    /** Get the video element that represents the VideoOverlay on the map */
    getElement(): SVGElement | undefined;

    options: L.ImageOverlayOptions;
  }

  export function svgOverlay(el: string | string[] | SVGElement, bounds: L.LatLngBoundsExpression, options?: L.ImageOverlayOptions): SVGOverlay;



}

