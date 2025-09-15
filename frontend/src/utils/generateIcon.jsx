export default function getWeatherSvg(code, classname, isDay) {
  const day = !!isDay;

  switch (true) {
    case [0, 1, 2].includes(code) && day:
      return (
        <svg
          className={classname}
          width="115.69059mm"
          height="104.13317mm"
          viewBox="0 0 115.69059 104.13317"
          version="1.1"
          id="svg1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs id="defs1">
            <filter
              id="filter14"
              x="-0.087267588"
              y="-0.20712805"
              width="1.1695955"
              height="1.5005595"
              colorInterpolationFilters="sRGB"
            >
              <feFlood
                result="flood"
                in="SourceGraphic"
                floodOpacity="0.400000"
                floodColor="rgb(208,215,220)"
                id="feFlood13"
              />
              <feGaussianBlur
                result="blur"
                in="SourceGraphic"
                stdDeviation="1.000000"
                id="feGaussianBlur13"
              />
              <feOffset
                result="offset"
                in="blur"
                dx="0.200000"
                dy="1.000000"
                id="feOffset13"
              />
              <feComposite
                result="comp1"
                operator="in"
                in="flood"
                in2="offset"
                id="feComposite13"
              />
              <feComposite
                result="fbSourceGraphic"
                operator="over"
                in="SourceGraphic"
                in2="comp1"
                id="feComposite14"
              />
              <feColorMatrix
                result="fbSourceGraphicAlpha"
                in="fbSourceGraphic"
                values="0 0 0 -1 0 0 0 0 -1 0 0 0 0 -1 0 0 0 0 1 0"
                id="feColorMatrix26"
              />
              <feFlood
                id="feFlood26"
                result="flood"
                in="fbSourceGraphic"
                floodOpacity="0.400000"
                floodColor="rgb(208,215,220)"
              />
              <feGaussianBlur
                id="feGaussianBlur26"
                result="blur"
                in="fbSourceGraphic"
                stdDeviation="1.000000"
              />
              <feOffset
                id="feOffset26"
                result="offset"
                in="blur"
                dx="-0.500000"
                dy="1.000000"
              />
              <feComposite
                id="feComposite26"
                result="comp1"
                operator="in"
                in="flood"
                in2="offset"
              />
              <feComposite
                id="feComposite27"
                result="comp2"
                operator="over"
                in="fbSourceGraphic"
                in2="comp1"
              />
            </filter>
          </defs>
          <g id="layer1" transform="translate(-42.349772,-90.776693)">
            <g id="layer1-4" transform="translate(1.7529946,-12.031267)">
              <g id="g155">
                <path
                  fill="#ffcc00"
                  stroke="#ffd42a"
                  strokeWidth="1.165"
                  strokeLinecap="round"
                  strokeOpacity="1"
                  paintOrder="stroke fill markers"
                  transform="rotate(57.201253,105.47721,149.43521)"
                  d="m 78.777746,105.86459 53.191394,89.20309"
                  id="path149"
                />
                <path
                  fill="#ffcc00"
                  stroke="#ffd42a"
                  strokeWidth="1.165"
                  strokeLinecap="round"
                  strokeOpacity="1"
                  paintOrder="stroke fill markers"
                  transform="rotate(57.201253,105.47721,149.43521)"
                  d="M 69.489908,126.96508 Z"
                  id="path147"
                />
                <path
                  fill="#ffcc00"
                  stroke="#ffd42a"
                  strokeWidth="1.165"
                  strokeLinecap="round"
                  strokeOpacity="1"
                  paintOrder="stroke fill markers"
                  transform="rotate(57.201253,105.47721,149.43521)"
                  d="m 66.435647,125.14374 76.893633,49.55219"
                  id="path145"
                />
                <path
                  fill="#ffcc00"
                  stroke="#ffd42a"
                  strokeWidth="1.165"
                  strokeLinecap="round"
                  strokeOpacity="1"
                  paintOrder="stroke fill markers"
                  transform="rotate(57.201253,105.47721,149.43521)"
                  d="M 129.53803,111.3956 80.226915,188.44406"
                  id="path143"
                />
                <path
                  fill="#ffcc00"
                  stroke="#ffd42a"
                  strokeWidth="1.165"
                  strokeLinecap="round"
                  strokeOpacity="1"
                  paintOrder="stroke fill markers"
                  transform="rotate(57.201253,105.47721,149.43521)"
                  d="m 96.673505,104.92399 16.417925,89.99168"
                  id="path141"
                />
                <path
                  fill="#ffcc00"
                  stroke="#ffd42a"
                  strokeWidth="1.165"
                  strokeLinecap="round"
                  strokeOpacity="1"
                  paintOrder="stroke fill markers"
                  transform="rotate(57.201253,105.47721,149.43521)"
                  d="M 60.785867,162.06491 148.97906,137.77477"
                  id="path139"
                />
                <path
                  fill="#ffcc00"
                  stroke="#ffd42a"
                  strokeWidth="1.165"
                  strokeLinecap="round"
                  strokeOpacity="1"
                  paintOrder="stroke fill markers"
                  transform="rotate(57.201253,105.47721,149.43521)"
                  d="M 53.106017,145.94146 156.65892,153.8982"
                  id="path137"
                />
                <path
                  fill="#ffcc00"
                  stroke="#ffd42a"
                  strokeWidth="1.165"
                  strokeLinecap="round"
                  strokeOpacity="1"
                  paintOrder="stroke fill markers"
                  transform="rotate(57.201253,105.47721,149.43521)"
                  d="M 114.63687,105.8882 95.148508,195.26524"
                  id="path135"
                />
                <path
                  fill="#ffcc00"
                  stroke="#ffd42a"
                  strokeWidth="1.165"
                  strokeLinecap="round"
                  strokeOpacity="1"
                  paintOrder="stroke fill markers"
                  transform="rotate(57.201253,105.47721,149.43521)"
                  d="m 139.32715,119.82703 -68.889357,60.1856"
                  id="path133"
                />
                <path
                  fill="#ffcc00"
                  stroke="#ffd42a"
                  strokeWidth="1.165"
                  strokeLinecap="round"
                  strokeOpacity="1"
                  paintOrder="stroke fill markers"
                  transform="rotate(57.201253,105.47721,149.43521)"
                  d="m 72.124851,116.95348 64.615479,64.75253"
                  id="path131"
                />
                <path
                  fill="#ffcc00"
                  stroke="#ffd42a"
                  strokeWidth="1.165"
                  strokeLinecap="round"
                  strokeOpacity="1"
                  paintOrder="stroke fill markers"
                  transform="rotate(57.201253,105.47721,149.43521)"
                  d="M 147.47467,164.80204 61.390501,133.85747"
                  id="path129"
                />
                <path
                  fill="#ffcc00"
                  stroke="#ffd42a"
                  strokeWidth="1.165"
                  strokeLinecap="round"
                  strokeOpacity="1"
                  paintOrder="stroke fill markers"
                  transform="rotate(57.201253,105.47721,149.43521)"
                  d="M 144.55331,127.36752 64.311848,171.29198"
                  id="path127"
                />
                <path
                  fill="#ffcc00"
                  stroke="#ffd42a"
                  strokeWidth="1.165"
                  strokeLinecap="round"
                  strokeOpacity="1"
                  paintOrder="stroke fill markers"
                  transform="rotate(57.201253,105.47721,149.43521)"
                  d="m 87.541104,106.82456 33.782946,85.01038"
                  id="path125"
                />
                <path
                  fill="#ffcc00"
                  stroke="#ffd42a"
                  strokeWidth="1.165"
                  strokeLinecap="round"
                  strokeOpacity="1"
                  paintOrder="stroke fill markers"
                  transform="rotate(57.201253,105.47721,149.43521)"
                  d="m 149.45101,145.34188 -91.153262,7.68988"
                  id="path123"
                />
                <path
                  fill="#ffcc00"
                  stroke="#ffd42a"
                  strokeWidth="1.165"
                  strokeLinecap="round"
                  strokeOpacity="1"
                  paintOrder="stroke fill markers"
                  transform="rotate(57.201253,105.47721,149.43521)"
                  d="m 105.39412,97.993276 -1.0233,103.853104"
                  id="path29"
                />
                <path
                  fill="#ffcc00"
                  stroke="#ffd42a"
                  strokeWidth="1.165"
                  strokeLinecap="round"
                  strokeOpacity="1"
                  paintOrder="stroke fill markers"
                  transform="rotate(79.50107,104.7265,149.71592)"
                  d="m 105.39412,97.993276 -1.0233,103.853104"
                  id="path153"
                />
              </g>
              <path
                fill="#ffcc00"
                stroke="#ffd42a"
                strokeWidth="1.165"
                strokeLinecap="round"
                strokeOpacity="1"
                paintOrder="stroke fill markers"
                transform="rotate(57.201253,105.47721,149.43521)"
                d="m 126.90556,114.45686 c -9.1297,-5.88341 -20.62517,-7.97223 -31.241039,-5.67676 -10.615873,2.29548 -20.221414,8.94698 -26.104823,18.07668 -5.883409,9.1297 -7.972229,20.62517 -5.676752,31.24104 2.295477,10.61587 8.946979,20.22141 18.076681,26.10482 9.129702,5.88341 20.625163,7.97223 31.241043,5.67676 10.61587,-2.29548 20.22141,-8.94698 26.10482,-18.07668 5.88341,-9.1297 7.97223,-20.62517 5.67675,-31.24104 -2.29548,-10.61587 -8.94698,-20.22141 -18.07668,-26.10482 z"
                id="path151"
              />
            </g>
            <g
              id="layer1-7"
              filter="url(#filter14)"
              transform="matrix(1.2308622,0,0,1.5468697,-42.990363,-63.242643)"
            >
              <path
                d="m 105.86418,136.91296 c -3.08514,0.009 -5.988723,1.45961 -7.849303,3.92059 -1.21352,-0.68851 -2.58455,-1.05127 -3.97978,-1.05301 -4.46548,-8e-5 -8.08548,3.61992 -8.0854,8.08539 l 6.4e-4,0.008 c -1.24423,-1.26473 -2.90123,-1.97175 -4.62546,-1.97363 -3.69548,0 -6.69126,3.1741 -6.69125,7.08955 0.025,3.68353 2.70826,6.73314 6.17458,7.01748 0.0218,0.0444 0.0588,0.0797 0.11183,0.0797 h 30.761053 11.81305 5.58923 c 0.0534,0 0.0906,-0.0357 0.11228,-0.0806 0.0297,0.004 0.0593,0.008 0.089,0.012 3.35887,-6e-5 6.08175,-2.7997 6.08172,-6.2532 -9e-5,-3.45341 -2.72293,-6.25293 -6.08172,-6.25298 -0.2278,0.0175 -0.45446,0.0482 -0.67889,0.092 -1.18025,-5.27945 -5.74936,-9.02195 -11.01806,-9.02477 -1.67007,0.0146 -3.31628,0.40921 -4.82042,1.15558 -1.844,-1.80653 -4.32194,-2.81937 -6.90338,-2.82172 z"
                fill="#e8eced"
                fillOpacity="1"
                strokeWidth="0.45172"
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                id="path6"
              />
            </g>
          </g>
        </svg>
      );

    case [0, 1, 2].includes(code) && !day:
      return (
        <svg
          className={classname}
          width="119.36097mm"
          height="180.92316mm"
          viewBox="0 0 119.36097 180.92316"
          version="1.1"
          id="svg1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs id="defs1">
            <filter
              colorInterpolationFilters="sRGB"
              id="filter274"
              x="-0.071549008"
              y="-0.072746749"
              width="1.143098"
              height="1.1454935"
            >
              <feGaussianBlur
                stdDeviation="0.61 0.61"
                result="blur"
                id="feGaussianBlur274"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              id="filter275"
              x="-0.17115921"
              y="-0.17600487"
              width="1.3423184"
              height="1.3520097"
            >
              <feGaussianBlur
                stdDeviation="0.61 0.61"
                result="blur"
                id="feGaussianBlur275"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              id="filter276"
              x="-0.17115921"
              y="-0.17600487"
              width="1.3423184"
              height="1.3520097"
            >
              <feGaussianBlur
                stdDeviation="0.61 0.61"
                result="blur"
                id="feGaussianBlur276"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              id="filter277"
              x="-0.071549008"
              y="-0.072746749"
              width="1.143098"
              height="1.1454935"
            >
              <feGaussianBlur
                stdDeviation="0.61 0.61"
                result="blur"
                id="feGaussianBlur277"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              id="filter278"
              x="-0.17115921"
              y="-0.17600487"
              width="1.3423184"
              height="1.3520097"
            >
              <feGaussianBlur
                stdDeviation="0.61 0.61"
                result="blur"
                id="feGaussianBlur278"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              id="filter279"
              x="-0.071549008"
              y="-0.072746749"
              width="1.143098"
              height="1.1454935"
            >
              <feGaussianBlur
                stdDeviation="0.61 0.61"
                result="blur"
                id="feGaussianBlur279"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              id="filter280"
              x="-0.17115921"
              y="-0.17600487"
              width="1.3423184"
              height="1.3520097"
            >
              <feGaussianBlur
                stdDeviation="0.61 0.61"
                result="blur"
                id="feGaussianBlur280"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              id="filter281"
              x="-0.17115921"
              y="-0.17600487"
              width="1.3423184"
              height="1.3520097"
            >
              <feGaussianBlur
                stdDeviation="0.61 0.61"
                result="blur"
                id="feGaussianBlur281"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              id="filter282"
              x="-0.17115921"
              y="-0.17600487"
              width="1.3423184"
              height="1.3520097"
            >
              <feGaussianBlur
                stdDeviation="0.61 0.61"
                result="blur"
                id="feGaussianBlur282"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              id="filter283"
              x="-0.016492966"
              y="-0.014974274"
              width="1.0329859"
              height="1.0299485"
            >
              <feGaussianBlur
                stdDeviation="0.61 0.61"
                result="blur"
                id="feGaussianBlur283"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              id="filter284"
              x="-0.027980103"
              y="-0.015280957"
              width="1.0559602"
              height="1.0305619"
            >
              <feGaussianBlur
                stdDeviation="0.61 0.61"
                result="blur"
                id="feGaussianBlur284"
              />
            </filter>
          </defs>
          <g id="layer1" transform="translate(-43.551876,-35.517408)">
            <g id="g5">
              <path
                d="m 114.25969,119.17104 a 52.302872,52.002354 0 0 1 25.19949,44.46137 52.302872,52.002354 0 0 1 -43.059897,51.0837 49.014111,49.014111 0 0 0 3.30884,0.26045 49.014111,49.014111 0 0 0 49.014057,-49.01406 49.014111,49.014111 0 0 0 -34.46249,-46.79146 z"
                fill="#ffff00"
                fillOpacity={1}
                strokeWidth={1.165}
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                filter="url(#filter284)"
                id="path4"
              />
              <path
                d="m 114.25969,119.17104 a 49.014111,49.014111 0 0 0 -14.551567,-2.22261 49.014111,49.014111 0 0 0 -49.01406,49.01407 49.014111,49.014111 0 0 0 45.70522,48.75361 52.302872,52.002354 0 0 0 43.059897,-51.0837 52.302872,52.002354 0 0 0 -25.19949,-44.46137 z"
                fill="#3d4a52"
                fillOpacity={1}
                strokeWidth={1.165}
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                filter="url(#filter283)"
                id="path5"
              />
              <path
                d="m 110.05398,55.75583 -2.92538,0.634172 -1.13603,2.769386 -1.50713,-2.586238 -2.9849,-0.224642 1.99393,-2.232555 -0.70873,-2.908222 2.73944,1.206443 2.54687,-1.572738 -0.30086,2.978178 z"
                fill="#ffff00"
                fillOpacity={1}
                stroke="none"
                strokeWidth={1.165}
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                filter="url(#filter278)"
                id="path6"
              />
              <path
                d="m 110.05398,55.75583 -2.92538,0.634172 -1.13603,2.769386 -1.50713,-2.586238 -2.9849,-0.224642 1.99393,-2.232555 -0.70873,-2.908222 2.73944,1.206443 2.54687,-1.572738 -0.30086,2.978178 z"
                fill="#ffff00"
                fillOpacity={1}
                stroke="none"
                strokeWidth={1.165}
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                filter="url(#filter276)"
                id="path7"
                transform="translate(18.585276,13.847852)"
              />
              <path
                d="m 110.05398,55.75583 -2.92538,0.634172 -1.13603,2.769386 -1.50713,-2.586238 -2.9849,-0.224642 1.99393,-2.232555 -0.70873,-2.908222 2.73944,1.206443 2.54687,-1.572738 -0.30086,2.978178 z"
                fill="#ffff00"
                fillOpacity={1}
                stroke="none"
                strokeWidth={1.165}
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                filter="url(#filter280)"
                id="path8"
                transform="translate(-32.433129,24.051533)"
              />
              <path
                d="m 110.05398,55.75583 -2.92538,0.634172 -1.13603,2.769386 -1.50713,-2.586238 -2.9849,-0.224642 1.99393,-2.232555 -0.70873,-2.908222 2.73944,1.206443 2.54687,-1.572738 -0.30086,2.978178 z"
                fill="#ffff00"
                fillOpacity={1}
                stroke="none"
                strokeWidth={1.165}
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                filter="url(#filter282)"
                id="path9"
                transform="translate(-56.484663,1.8220851)"
              />
              <path
                d="m 110.05398,55.75583 -2.92538,0.634172 -1.13603,2.769386 -1.50713,-2.586238 -2.9849,-0.224642 1.99393,-2.232555 -0.70873,-2.908222 2.73944,1.206443 2.54687,-1.572738 -0.30086,2.978178 z"
                fill="#ffff00"
                fillOpacity={1}
                stroke="none"
                strokeWidth={1.165}
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                filter="url(#filter281)"
                id="path10"
                transform="translate(-48.467485,44.823312)"
              />
              <path
                d="m 110.05398,55.75583 -2.92538,0.634172 -1.13603,2.769386 -1.50713,-2.586238 -2.9849,-0.224642 1.99393,-2.232555 -0.70873,-2.908222 2.73944,1.206443 2.54687,-1.572738 -0.30086,2.978178 z"
                fill="#ffff00"
                fillOpacity={1}
                stroke="none"
                strokeWidth={1.165}
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                filter="url(#filter275)"
                id="path11"
                transform="translate(33.52638,38.263803)"
              />
              <path
                d="m 156.27696,62.936689 -5.97356,-3.988742 -6.67234,2.659604 1.94759,-6.913788 -4.5913,-5.523906 7.17724,-0.284214 3.83476,-6.073565 2.48819,6.738134 6.96131,1.770236 -5.63945,4.44861 z"
                fill="#ffff00"
                fillOpacity={1}
                stroke="none"
                strokeWidth={1.165}
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                filter="url(#filter274)"
                id="path12"
              />
              <path
                d="m 156.27696,62.936689 -5.97356,-3.988742 -6.67234,2.659604 1.94759,-6.913788 -4.5913,-5.523906 7.17724,-0.284214 3.83476,-6.073565 2.48819,6.738134 6.96131,1.770236 -5.63945,4.44861 z"
                fill="#ffff00"
                fillOpacity={1}
                stroke="none"
                strokeWidth={1.165}
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                filter="url(#filter279)"
                id="path13"
                transform="translate(-74.341104,-5.8306748)"
              />
              <path
                d="m 156.27696,62.936689 -5.97356,-3.988742 -6.67234,2.659604 1.94759,-6.913788 -4.5913,-5.523906 7.17724,-0.284214 3.83476,-6.073565 2.48819,6.738134 6.96131,1.770236 -5.63945,4.44861 z"
                fill="#ffff00"
                fillOpacity={1}
                stroke="none"
                strokeWidth={1.165}
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                filter="url(#filter277)"
                id="path14"
                transform="translate(-49.925153,30.611043)"
              />
            </g>
          </g>
        </svg>
      );

    case code === 3 && day:
      return (
        <svg
          className={classname}
          width="134.74449mm"
          height="104.13317mm"
          viewBox="0 0 134.74449 104.13317"
          version="1.1"
          id="svg1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs id="defs1">
            <filter
              id="filter14"
              x="-0.087267594"
              y="-0.20712805"
              width="1.1695955"
              height="1.5005595"
              colorInterpolationFilters="sRGB"
            >
              <feFlood
                result="flood"
                in="SourceGraphic"
                floodOpacity="0.400000"
                floodColor="rgb(208,215,220)"
                id="feFlood13"
              />
              <feGaussianBlur
                result="blur"
                in="SourceGraphic"
                stdDeviation="1.000000"
                id="feGaussianBlur13"
              />
              <feOffset
                result="offset"
                in="blur"
                dx="0.200000"
                dy="1.000000"
                id="feOffset13"
              />
              <feComposite
                result="comp1"
                operator="in"
                in="flood"
                in2="offset"
                id="feComposite13"
              />
              <feComposite
                result="fbSourceGraphic"
                operator="over"
                in="SourceGraphic"
                in2="comp1"
                id="feComposite14"
              />
              <feColorMatrix
                result="fbSourceGraphicAlpha"
                in="fbSourceGraphic"
                values="0 0 0 -1 0 0 0 0 -1 0 0 0 0 -1 0 0 0 0 1 0"
                id="feColorMatrix26"
              />
              <feFlood
                id="feFlood26"
                result="flood"
                in="fbSourceGraphic"
                floodOpacity="0.400000"
                floodColor="rgb(208,215,220)"
              />
              <feGaussianBlur
                id="feGaussianBlur26"
                result="blur"
                in="fbSourceGraphic"
                stdDeviation="1.000000"
              />
              <feOffset
                id="feOffset26"
                result="offset"
                in="blur"
                dx="-0.500000"
                dy="1.000000"
              />
              <feComposite
                id="feComposite26"
                result="comp1"
                operator="in"
                in="flood"
                in2="offset"
              />
              <feComposite
                id="feComposite27"
                result="comp2"
                operator="over"
                in="fbSourceGraphic"
                in2="comp1"
              />
            </filter>
          </defs>
          <g id="layer1" transform="translate(-42.349772,-90.776693)">
            <g id="layer1-4" transform="translate(1.7529946,-12.031267)">
              <g id="g155">
                {[
                  "path149",
                  "path147",
                  "path145",
                  "path143",
                  "path141",
                  "path139",
                  "path137",
                  "path135",
                  "path133",
                  "path131",
                  "path129",
                  "path127",
                  "path125",
                  "path123",
                  "path29",
                  "path153",
                ].map((pid, i) => {
                  const dList = [
                    "m 78.777746,105.86459 53.191394,89.20309",
                    "M 69.489908,126.96508 Z",
                    "m 66.435647,125.14374 76.893633,49.55219",
                    "M 129.53803,111.3956 80.226915,188.44406",
                    "m 96.673505,104.92399 16.417925,89.99168",
                    "M 60.785867,162.06491 148.97906,137.77477",
                    "M 53.106017,145.94146 156.65892,153.8982",
                    "M 114.63687,105.8882 95.148508,195.26524",
                    "m 139.32715,119.82703 -68.889357,60.1856",
                    "m 72.124851,116.95348 64.615479,64.75253",
                    "M 147.47467,164.80204 61.390501,133.85747",
                    "M 144.55331,127.36752 64.311848,171.29198",
                    "m 87.541104,106.82456 33.782946,85.01038",
                    "m 149.45101,145.34188 -91.153262,7.68988",
                    "m 105.39412,97.993276 -1.0233,103.853104",
                    "m 105.39412,97.993276 -1.0233,103.853104",
                  ];
                  const tr =
                    i === 15
                      ? "rotate(79.50107,104.7265,149.71592)"
                      : "rotate(57.201253,105.47721,149.43521)";
                  return (
                    <path
                      key={pid}
                      id={pid}
                      fill="#ffcc00"
                      stroke="#ffd42a"
                      strokeWidth="1.165"
                      strokeLinecap="round"
                      strokeOpacity="1"
                      paintOrder="stroke fill markers"
                      transform={tr}
                      d={dList[i]}
                    />
                  );
                })}
              </g>
              <path
                fill="#ffcc00"
                stroke="#ffd42a"
                strokeWidth="1.165"
                strokeLinecap="round"
                strokeOpacity="1"
                paintOrder="stroke fill markers"
                transform="rotate(57.201253,105.47721,149.43521)"
                d="m 126.90556,114.45686 c -9.1297,-5.88341 -20.62517,-7.97223 -31.241039,-5.67676 -10.615873,2.29548 -20.221414,8.94698 -26.104823,18.07668 -5.883409,9.1297 -7.972229,20.62517 -5.676752,31.24104 2.295477,10.61587 8.946979,20.22141 18.076681,26.10482 9.129702,5.88341 20.625163,7.97223 31.241043,5.67676 10.61587,-2.29548 20.22141,-8.94698 26.10482,-18.07668 5.88341,-9.1297 7.97223,-20.62517 5.67675,-31.24104 -2.29548,-10.61587 -8.94698,-20.22141 -18.07668,-26.10482 z"
                id="path151"
              />
            </g>
            <g
              id="layer1-7"
              filter="url(#filter14)"
              transform="matrix(1.2308622,0,0,1.5468697,-42.990363,-63.242643)"
            >
              <path
                d="m 105.86418,136.91296 c -3.08514,0.009 -5.988723,1.45961 -7.849303,3.92059 -1.21352,-0.68851 -2.58455,-1.05127 -3.97978,-1.05301 -4.46548,-8e-5 -8.08548,3.61992 -8.0854,8.08539 l 6.4e-4,0.008 c -1.24423,-1.26473 -2.90123,-1.97175 -4.62546,-1.97363 -3.69548,0 -6.69126,3.1741 -6.69125,7.08955 0.025,3.68353 2.70826,6.73314 6.17458,7.01748 0.0218,0.0444 0.0588,0.0797 0.11183,0.0797 h 30.761053 11.81305 5.58923 c 0.0534,0 0.0906,-0.0357 0.11228,-0.0806 0.0297,0.004 0.0593,0.008 0.089,0.012 3.35887,-6e-5 6.08175,-2.7997 6.08172,-6.2532 -9e-5,-3.45341 -2.72293,-6.25293 -6.08172,-6.25298 -0.2278,0.0175 -0.45446,0.0482 -0.67889,0.092 -1.18025,-5.27945 -5.74936,-9.02195 -11.01806,-9.02477 -1.67007,0.0146 -3.31628,0.40921 -4.82042,1.15558 -1.844,-1.80653 -4.32194,-2.81937 -6.90338,-2.82172 z"
                fill="#e8eced"
                fillOpacity="1"
                strokeWidth="0.45172"
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                id="path6"
              />
            </g>
            <g
              id="g4"
              filter="url(#filter14)"
              transform="matrix(1.2308622,0,0,1.5468697,11.653388,-66.332907)"
            >
              <path
                d="m 99.908384,135.17366 c -3.08514,0.009 -5.988723,1.45961 -7.849303,3.92059 -1.21352,-0.68851 -2.58455,-1.05127 -3.97978,-1.05301 -4.46548,-8e-5 -8.08548,3.61992 -8.0854,8.08539 l 6.4e-4,0.008 c -1.24423,-1.26473 -2.90123,-1.97175 -4.62546,-1.97363 -3.69548,0 -6.69126,3.1741 -6.69125,7.08955 0.025,3.68353 2.70826,6.73314 6.17458,7.01748 0.0218,0.0444 0.0588,0.0797 0.11183,0.0797 h 30.761049 11.81305 5.58923 c 0.0534,0 0.0906,-0.0357 0.11228,-0.0806 0.0297,0.004 0.0593,0.008 0.089,0.012 3.35887,-6e-5 6.08175,-2.7997 6.08172,-6.2532 -9e-5,-3.45341 -2.72293,-6.25293 -6.08172,-6.25298 -0.2278,0.0175 -0.45446,0.0482 -0.67889,0.092 -1.18025,-5.27945 -5.74936,-9.02195 -11.01806,-9.02477 -1.67007,0.0146 -3.31628,0.40921 -4.82042,1.15558 -1.844,-1.80653 -4.32194,-2.81937 -6.903376,-2.82172 z"
                fill="#c8d1d2"
                fillOpacity="1"
                strokeWidth="0.45172"
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                id="path4"
              />
            </g>
          </g>
        </svg>
      );

    case code === 3 && !day:
      return (
        <svg
          className={classname}
          width="140.0652mm"
          height="201.31993mm"
          viewBox="0 0 140.0652 201.31993"
          version="1.1"
          id="svg1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs id="defs1">
            <filter
              colorInterpolationFilters="sRGB"
              id="filter274"
              x="-0.071549008"
              y="-0.072746749"
              width="1.143098"
              height="1.1454935"
            >
              <feGaussianBlur
                stdDeviation="0.61 0.61"
                result="blur"
                id="feGaussianBlur274"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              id="filter275"
              x="-0.17115921"
              y="-0.17600487"
              width="1.3423184"
              height="1.3520097"
            >
              <feGaussianBlur
                stdDeviation="0.61 0.61"
                result="blur"
                id="feGaussianBlur275"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              id="filter276"
              x="-0.17115921"
              y="-0.17600487"
              width="1.3423184"
              height="1.3520097"
            >
              <feGaussianBlur
                stdDeviation="0.61 0.61"
                result="blur"
                id="feGaussianBlur276"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              id="filter277"
              x="-0.071549008"
              y="-0.072746749"
              width="1.143098"
              height="1.1454935"
            >
              <feGaussianBlur
                stdDeviation="0.61 0.61"
                result="blur"
                id="feGaussianBlur277"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              id="filter278"
              x="-0.17115921"
              y="-0.17600487"
              width="1.3423184"
              height="1.3520097"
            >
              <feGaussianBlur
                stdDeviation="0.61 0.61"
                result="blur"
                id="feGaussianBlur278"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              id="filter279"
              x="-0.071549008"
              y="-0.072746749"
              width="1.143098"
              height="1.1454935"
            >
              <feGaussianBlur
                stdDeviation="0.61 0.61"
                result="blur"
                id="feGaussianBlur279"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              id="filter280"
              x="-0.17115921"
              y="-0.17600487"
              width="1.3423184"
              height="1.3520097"
            >
              <feGaussianBlur
                stdDeviation="0.61 0.61"
                result="blur"
                id="feGaussianBlur280"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              id="filter281"
              x="-0.17115921"
              y="-0.17600487"
              width="1.3423184"
              height="1.3520097"
            >
              <feGaussianBlur
                stdDeviation="0.61 0.61"
                result="blur"
                id="feGaussianBlur281"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              id="filter282"
              x="-0.17115921"
              y="-0.17600487"
              width="1.3423184"
              height="1.3520097"
            >
              <feGaussianBlur
                stdDeviation="0.61 0.61"
                result="blur"
                id="feGaussianBlur282"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              id="filter283"
              x="-0.016492966"
              y="-0.014974274"
              width="1.0329859"
              height="1.0299485"
            >
              <feGaussianBlur
                stdDeviation="0.61 0.61"
                result="blur"
                id="feGaussianBlur283"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              id="filter284"
              x="-0.027980103"
              y="-0.015280957"
              width="1.0559602"
              height="1.0305619"
            >
              <feGaussianBlur
                stdDeviation="0.61 0.61"
                result="blur"
                id="feGaussianBlur284"
              />
            </filter>

            <filter
              colorInterpolationFilters="sRGB"
              id="filter14"
              x="-0.15168095"
              y="-0.38732946"
              width="1.2984222"
              height="1.8609623"
            >
              <feFlood
                result="flood"
                in="SourceGraphic"
                floodOpacity="0.400000"
                floodColor="rgb(208,215,220)"
                id="feFlood13"
              />
              <feGaussianBlur
                result="blur"
                in="SourceGraphic"
                stdDeviation="1.000000"
                id="feGaussianBlur13"
              />
              <feOffset
                result="offset"
                in="blur"
                dx="0.200000"
                dy="1.000000"
                id="feOffset13"
              />
              <feComposite
                result="comp1"
                operator="in"
                in="flood"
                in2="offset"
                id="feComposite13"
              />
              <feComposite
                result="fbSourceGraphic"
                operator="over"
                in="SourceGraphic"
                in2="comp1"
                id="feComposite14"
              />
              <feColorMatrix
                result="fbSourceGraphicAlpha"
                in="fbSourceGraphic"
                values="0 0 0 -1 0 0 0 0 -1 0 0 0 0 -1 0 0 0 0 1 0"
                id="feColorMatrix26"
              />
              <feFlood
                id="feFlood26"
                result="flood"
                in="fbSourceGraphic"
                floodOpacity="0.400000"
                floodColor="rgb(208,215,220)"
              />
              <feGaussianBlur
                id="feGaussianBlur26"
                result="blur"
                in="fbSourceGraphic"
                stdDeviation="1.000000"
              />
              <feOffset
                id="feOffset26"
                result="offset"
                in="blur"
                dx="-0.500000"
                dy="1.000000"
              />
              <feComposite
                id="feComposite26"
                result="comp1"
                operator="in"
                in="flood"
                in2="offset"
              />
              <feComposite
                id="feComposite27"
                result="fbSourceGraphic"
                operator="over"
                in="fbSourceGraphic"
                in2="comp1"
              />
              <feColorMatrix
                result="fbSourceGraphicAlpha"
                in="fbSourceGraphic"
                values="0 0 0 -1 0 0 0 0 -1 0 0 0 0 -1 0 0 0 0 1 0"
                id="feColorMatrix4"
              />
              <feGaussianBlur
                id="feGaussianBlur4"
                stdDeviation="1.23 1.34"
                result="blur"
                in="fbSourceGraphic"
              />
              <feColorMatrix
                id="feColorMatrix5"
                values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 50 0 "
                result="colormatrix"
              />
              <feComposite
                id="feComposite5"
                in="colormatrix"
                in2="fbSourceGraphic"
                operator="in"
                result="fbSourceGraphic"
              />
              <feColorMatrix
                result="fbSourceGraphicAlpha"
                in="fbSourceGraphic"
                values="0 0 0 -1 0 0 0 0 -1 0 0 0 0 -1 0 0 0 0 1 0"
                id="feColorMatrix9"
              />
              <feGaussianBlur
                id="feGaussianBlur9"
                stdDeviation="0.4"
                result="blur"
                in="fbSourceGraphic"
              />
              <feComposite
                id="feComposite9"
                in="fbSourceGraphic"
                in2="blur"
                operator="in"
                result="composite1"
              />
              <feComposite
                id="feComposite10"
                in="composite1"
                in2="composite1"
                operator="in"
                result="composite2"
              />
            </filter>
          </defs>

          <g id="layer1" transform="translate(-22.847653,-35.517403)">
            <g id="g5">
              <path
                d="m 114.25969,119.17104 a 52.302872,52.002354 0 0 1 25.19949,44.46137 52.302872,52.002354 0 0 1 -43.059897,51.0837 49.014111,49.014111 0 0 0 3.30884,0.26045 49.014111,49.014111 0 0 0 49.014057,-49.01406 49.014111,49.014111 0 0 0 -34.46249,-46.79146 z"
                fill="#ffff00"
                fillOpacity={1}
                strokeWidth={1.165}
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                filter="url(#filter284)"
                id="path4"
              />
              <path
                d="m 114.25969,119.17104 a 49.014111,49.014111 0 0 0 -14.551567,-2.22261 49.014111,49.014111 0 0 0 -49.01406,49.01407 49.014111,49.014111 0 0 0 45.70522,48.75361 52.302872,52.002354 0 0 0 43.059897,-51.0837 52.302872,52.002354 0 0 0 -25.19949,-44.46137 z"
                fill="#3d4a52"
                fillOpacity={1}
                strokeWidth={1.165}
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                filter="url(#filter283)"
                id="path5"
              />
              <path
                d="m 110.05398,55.75583 -2.92538,0.634172 -1.13603,2.769386 -1.50713,-2.586238 -2.9849,-0.224642 1.99393,-2.232555 -0.70873,-2.908222 2.73944,1.206443 2.54687,-1.572738 -0.30086,2.978178 z"
                fill="#ffff00"
                fillOpacity={1}
                stroke="none"
                strokeWidth={1.165}
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                filter="url(#filter278)"
                id="path6"
              />
              <path
                d="m 110.05398,55.75583 -2.92538,0.634172 -1.13603,2.769386 -1.50713,-2.586238 -2.9849,-0.224642 1.99393,-2.232555 -0.70873,-2.908222 2.73944,1.206443 2.54687,-1.572738 -0.30086,2.978178 z"
                fill="#ffff00"
                fillOpacity={1}
                stroke="none"
                strokeWidth={1.165}
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                filter="url(#filter276)"
                id="path7"
                transform="translate(18.585276,13.847852)"
              />
              <path
                d="m 110.05398,55.75583 -2.92538,0.634172 -1.13603,2.769386 -1.50713,-2.586238 -2.9849,-0.224642 1.99393,-2.232555 -0.70873,-2.908222 2.73944,1.206443 2.54687,-1.572738 -0.30086,2.978178 z"
                fill="#ffff00"
                fillOpacity={1}
                stroke="none"
                strokeWidth={1.165}
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                filter="url(#filter280)"
                id="path8"
                transform="translate(-32.433129,24.051533)"
              />
              <path
                d="m 110.05398,55.75583 -2.92538,0.634172 -1.13603,2.769386 -1.50713,-2.586238 -2.9849,-0.224642 1.99393,-2.232555 -0.70873,-2.908222 2.73944,1.206443 2.54687,-1.572738 -0.30086,2.978178 z"
                fill="#ffff00"
                fillOpacity={1}
                stroke="none"
                strokeWidth={1.165}
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                filter="url(#filter282)"
                id="path9"
                transform="translate(-56.484663,1.8220851)"
              />
              <path
                d="m 110.05398,55.75583 -2.92538,0.634172 -1.13603,2.769386 -1.50713,-2.586238 -2.9849,-0.224642 1.99393,-2.232555 -0.70873,-2.908222 2.73944,1.206443 2.54687,-1.572738 -0.30086,2.978178 z"
                fill="#ffff00"
                fillOpacity={1}
                stroke="none"
                strokeWidth={1.165}
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                filter="url(#filter281)"
                id="path10"
                transform="translate(-48.467485,44.823312)"
              />
              <path
                d="m 110.05398,55.75583 -2.92538,0.634172 -1.13603,2.769386 -1.50713,-2.586238 -2.9849,-0.224642 1.99393,-2.232555 -0.70873,-2.908222 2.73944,1.206443 2.54687,-1.572738 -0.30086,2.978178 z"
                fill="#ffff00"
                fillOpacity={1}
                stroke="none"
                strokeWidth={1.165}
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                filter="url(#filter275)"
                id="path11"
                transform="translate(33.52638,38.263803)"
              />
              <path
                d="m 156.27696,62.936689 -5.97356,-3.988742 -6.67234,2.659604 1.94759,-6.913788 -4.5913,-5.523906 7.17724,-0.284214 3.83476,-6.073565 2.48819,6.738134 6.96131,1.770236 -5.63945,4.44861 z"
                fill="#ffff00"
                fillOpacity={1}
                stroke="none"
                strokeWidth={1.165}
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                filter="url(#filter274)"
                id="path12"
              />
              <path
                d="m 156.27696,62.936689 -5.97356,-3.988742 -6.67234,2.659604 1.94759,-6.913788 -4.5913,-5.523906 7.17724,-0.284214 3.83476,-6.073565 2.48819,6.738134 6.96131,1.770236 -5.63945,4.44861 z"
                fill="#ffff00"
                fillOpacity={1}
                stroke="none"
                strokeWidth={1.165}
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                filter="url(#filter279)"
                id="path13"
                transform="translate(-74.341104,-5.8306748)"
              />
              <path
                d="m 156.27696,62.936689 -5.97356,-3.988742 -6.67234,2.659604 1.94759,-6.913788 -4.5913,-5.523906 7.17724,-0.284214 3.83476,-6.073565 2.48819,6.738134 6.96131,1.770236 -5.63945,4.44861 z"
                fill="#ffff00"
                fillOpacity={1}
                stroke="none"
                strokeWidth={1.165}
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                filter="url(#filter277)"
                id="path14"
                transform="translate(-49.925153,30.611043)"
              />
            </g>
          </g>

          <g
            id="layer1-4"
            fill="#a7a7a7"
            fillOpacity={1}
            filter="url(#filter14)"
            transform="matrix(1.4565941,0,0,1.4565941,-95.292755,-47.84947)"
          >
            <path
              id="path6-2"
              d="m 105.86418,136.91296 c -3.08514,0.009 -5.988723,1.45961 -7.849303,3.92059 -1.21352,-0.68851 -2.58455,-1.05127 -3.97978,-1.05301 -4.46548,-8e-5 -8.08548,3.61992 -8.0854,8.08539 l 6.4e-4,0.008 c -1.24423,-1.26473 -2.90123,-1.97175 -4.62546,-1.97363 -3.69548,0 -6.69126,3.1741 -6.69125,7.08955 0.025,3.68353 2.70826,6.73314 6.17458,7.01748 0.0218,0.0444 0.0588,0.0797 0.11183,0.0797 h 30.761053 11.81305 5.58923 c 0.0534,0 0.0906,-0.0357 0.11228,-0.0806 0.0297,0.004 0.0593,0.008 0.089,0.012 3.35887,-6e-5 6.08175,-2.7997 6.08172,-6.2532 -9e-5,-3.45341 -2.72293,-6.25293 -6.08172,-6.25298 -0.2278,0.0175 -0.45446,0.0482 -0.67889,0.092 -1.18025,-5.27945 -5.74936,-9.02195 -11.01806,-9.02477 -1.67007,0.0146 -3.31628,0.40921 -4.82042,1.15558 -1.844,-1.80653 -4.32194,-2.81937 -6.90338,-2.82172 z"
              fill="#a7a7a7"
              fillOpacity={1}
              strokeWidth={0.45172}
              strokeLinecap="round"
              paintOrder="stroke fill markers"
            />
          </g>
        </svg>
      );

    case [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code) &&
      !day:
      return (
        <svg
          width="100.95612mm"
          height="121.98528mm"
          viewBox="0 0 100.95612 121.98528"
          version="1.1"
          id="svg1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs id="defs1">
            <filter
              colorInterpolationFilters="sRGB"
              id="filter283"
              x="-0.016492966"
              y="-0.014974274"
              width="1.0329859"
              height="1.0299485"
            >
              <feGaussianBlur
                stdDeviation="0.61 0.61"
                result="blur"
                id="feGaussianBlur283"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              id="filter284"
              x="-0.027980103"
              y="-0.015280957"
              width="1.0559602"
              height="1.0305619"
            >
              <feGaussianBlur
                stdDeviation="0.61 0.61"
                result="blur"
                id="feGaussianBlur284"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              id="filter14-0"
              x="-0.087267592"
              y="-0.20712805"
              width="1.1695955"
              height="1.5005595"
            >
              <feFlood
                result="flood"
                in="SourceGraphic"
                floodOpacity="0.400000"
                floodColor="rgb(208,215,220)"
                id="feFlood13-28"
              />
              <feGaussianBlur
                result="blur"
                in="SourceGraphic"
                stdDeviation="1.000000"
                id="feGaussianBlur13-60"
              />
              <feOffset
                result="offset"
                in="blur"
                dx="0.200000"
                dy="1.000000"
                id="feOffset13-2"
              />
              <feComposite
                result="comp1"
                operator="in"
                in="flood"
                in2="offset"
                id="feComposite13-48"
              />
              <feComposite
                result="fbSourceGraphic"
                operator="over"
                in="SourceGraphic"
                in2="comp1"
                id="feComposite14-6"
              />
              <feColorMatrix
                result="fbSourceGraphicAlpha"
                in="fbSourceGraphic"
                values="0 0 0 -1 0 0 0 0 -1 0 0 0 0 -1 0 0 0 0 1 0"
                id="feColorMatrix26-5"
              />
              <feFlood
                id="feFlood26-0"
                result="flood"
                in="fbSourceGraphic"
                floodOpacity="0.400000"
                floodColor="rgb(208,215,220)"
              />
              <feGaussianBlur
                id="feGaussianBlur26-9"
                result="blur"
                in="fbSourceGraphic"
                stdDeviation="1.000000"
              />
              <feOffset
                id="feOffset26-0"
                result="offset"
                in="blur"
                dx="-0.500000"
                dy="1.000000"
              />
              <feComposite
                id="feComposite26-0"
                result="comp1"
                operator="in"
                in="flood"
                in2="offset"
              />
              <feComposite
                id="feComposite27-6"
                result="comp2"
                operator="over"
                in="fbSourceGraphic"
                in2="comp1"
              />
            </filter>
          </defs>

          <g id="layer1" transform="translate(-49.230059,-115.48443)">
            <g id="g5">
              <path
                d="m 114.25969,119.17104 a 52.302872,52.002354 0 0 1 25.19949,44.46137 52.302872,52.002354 0 0 1 -43.059897,51.0837 49.014111,49.014111 0 0 0 3.30884,0.26045 49.014111,49.014111 0 0 0 49.014057,-49.01406 49.014111,49.014111 0 0 0 -34.46249,-46.79146 z"
                fill="#ffff00"
                fillOpacity={1}
                strokeWidth={1.165}
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                filter="url(#filter284)"
                id="path4"
              />
              <path
                d="m 114.25969,119.17104 a 49.014111,49.014111 0 0 0 -14.551567,-2.22261 49.014111,49.014111 0 0 0 -49.01406,49.01407 49.014111,49.014111 0 0 0 45.70522,48.75361 52.302872,52.002354 0 0 0 43.059897,-51.0837 52.302872,52.002354 0 0 0 -25.19949,-44.46137 z"
                fill="#3d4a52"
                fillOpacity={1}
                strokeWidth={1.165}
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                filter="url(#filter283)"
                id="path5"
              />
            </g>
          </g>

          <g
            id="layer1-3"
            transform="matrix(0.58760599,0,0,0.58760599,-28.568229,1.9857838)"
          >
            <g
              id="g4"
              filter="url(#filter14-0)"
              transform="matrix(1.2308622,0,0,1.5468697,-20.901539,-81.905196)"
            >
              <path
                d="m 98.083583,137.60654 c -3.08514,0.009 -5.988723,1.45961 -7.849303,3.92059 -1.21352,-0.68851 -2.58455,-1.05127 -3.97978,-1.05301 -4.46548,-8e-5 -8.08548,3.61992 -8.0854,8.08539 l 6.4e-4,0.008 c -1.24423,-1.26473 -2.90123,-1.97175 -4.62546,-1.97363 -3.69548,0 -6.69126,3.1741 -6.69125,7.08955 0.025,3.68353 2.70826,6.73314 6.17458,7.01748 0.0218,0.0444 0.0588,0.0797 0.11183,0.0797 h 30.76105 11.81305 5.58923 c 0.0534,0 0.0906,-0.0357 0.11228,-0.0806 0.0297,0.004 0.0593,0.008 0.089,0.012 3.35887,-6e-5 6.08175,-2.7997 6.08172,-6.2532 -9e-5,-3.45341 -2.72293,-6.25293 -6.08172,-6.25298 -0.2278,0.0175 -0.45446,0.0482 -0.67889,0.092 -1.18025,-5.27945 -5.74936,-9.02195 -11.01806,-9.02477 -1.67007,0.0146 -3.31628,0.40921 -4.82042,1.15558 -1.844,-1.80653 -4.32194,-2.81937 -6.903377,-2.82172 z"
                fill="#c8d1d2"
                fillOpacity={1}
                strokeWidth={0.45172}
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                id="path4-8"
              />
            </g>
            <path
              d="m 77.839481,171.03482 c 0,4.12291 0,8.24582 0,12.36873"
              fill="none"
              fillOpacity={1}
              stroke="#acfcff"
              strokeWidth={1.165}
              strokeLinecap="round"
              strokeOpacity={1}
              paintOrder="stroke fill markers"
              id="path7"
            />
            <path
              d="m 99.227075,172.32064 c 0,5.92841 0,11.85682 0,17.78523"
              fill="none"
              fillOpacity={1}
              stroke="#acfcff"
              strokeWidth={1.39699}
              strokeLinecap="round"
              strokeOpacity={1}
              paintOrder="stroke fill markers"
              id="path8"
            />
            <path
              d="m 121.13003,171.02101 c 0,4.12291 0,8.24582 0,12.36873"
              fill="none"
              fillOpacity={1}
              stroke="#acfcff"
              strokeWidth={1.165}
              strokeLinecap="round"
              strokeOpacity={1}
              paintOrder="stroke fill markers"
              id="path9"
            />
            <path
              d="m 88.146755,175.6705 c 0,5.92841 0,11.85682 0,17.78523"
              fill="none"
              fillOpacity={1}
              stroke="#acfcff"
              strokeWidth={1.39699}
              strokeLinecap="round"
              strokeOpacity={1}
              paintOrder="stroke fill markers"
              id="path10"
            />
            <path
              d="m 110.30739,178.76268 c 0,5.92841 0,11.85682 0,17.78523"
              fill="none"
              fillOpacity={1}
              stroke="#acfcff"
              strokeWidth={1.39699}
              strokeLinecap="round"
              strokeOpacity={1}
              paintOrder="stroke fill markers"
              id="path11"
            />
          </g>

          <g
            id="g17"
            transform="matrix(0.53993038,0,0,0.53993038,13.658943,15.485952)"
          >
            <g
              id="g12"
              filter="url(#filter14-0)"
              transform="matrix(1.2308622,0,0,1.5468697,-20.901539,-81.905196)"
            >
              <path
                d="m 98.083583,137.60654 c -3.08514,0.009 -5.988723,1.45961 -7.849303,3.92059 -1.21352,-0.68851 -2.58455,-1.05127 -3.97978,-1.05301 -4.46548,-8e-5 -8.08548,3.61992 -8.0854,8.08539 l 6.4e-4,0.008 c -1.24423,-1.26473 -2.90123,-1.97175 -4.62546,-1.97363 -3.69548,0 -6.69126,3.1741 -6.69125,7.08955 0.025,3.68353 2.70826,6.73314 6.17458,7.01748 0.0218,0.0444 0.0588,0.0797 0.11183,0.0797 h 30.76105 11.81305 5.58923 c 0.0534,0 0.0906,-0.0357 0.11228,-0.0806 0.0297,0.004 0.0593,0.008 0.089,0.012 3.35887,-6e-5 6.08175,-2.7997 6.08172,-6.2532 -9e-5,-3.45341 -2.72293,-6.25293 -6.08172,-6.25298 -0.2278,0.0175 -0.45446,0.0482 -0.67889,0.092 -1.18025,-5.27945 -5.74936,-9.02195 -11.01806,-9.02477 -1.67007,0.0146 -3.31628,0.40921 -4.82042,1.15558 -1.844,-1.80653 -4.32194,-2.81937 -6.903377,-2.82172 z"
                fill="#c8d1d2"
                fillOpacity={1}
                strokeWidth={0.45172}
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                id="path12"
              />
            </g>
            <path
              d="m 77.839481,171.03482 c 0,4.12291 0,8.24582 0,12.36873"
              fill="none"
              fillOpacity={1}
              stroke="#acfcff"
              strokeWidth={1.165}
              strokeLinecap="round"
              strokeOpacity={1}
              paintOrder="stroke fill markers"
              id="path13"
            />
            <path
              d="m 99.227075,172.32064 c 0,5.92841 0,11.85682 0,17.78523"
              fill="none"
              fillOpacity={1}
              stroke="#acfcff"
              strokeWidth={1.39699}
              strokeLinecap="round"
              strokeOpacity={1}
              paintOrder="stroke fill markers"
              id="path14"
            />
            <path
              d="m 121.13003,171.02101 c 0,4.12291 0,8.24582 0,12.36873"
              fill="none"
              fillOpacity={1}
              stroke="#acfcff"
              strokeWidth={1.165}
              strokeLinecap="round"
              strokeOpacity={1}
              paintOrder="stroke fill markers"
              id="path15"
            />
            <path
              d="m 88.146755,175.6705 c 0,5.92841 0,11.85682 0,17.78523"
              fill="none"
              fillOpacity={1}
              stroke="#acfcff"
              strokeWidth={1.39699}
              strokeLinecap="round"
              strokeOpacity={1}
              paintOrder="stroke fill markers"
              id="path16"
            />
            <path
              d="m 110.30739,178.76268 c 0,5.92841 0,11.85682 0,17.78523"
              fill="none"
              fillOpacity={1}
              stroke="#acfcff"
              strokeWidth={1.39699}
              strokeLinecap="round"
              strokeOpacity={1}
              paintOrder="stroke fill markers"
              id="path17"
            />
          </g>
        </svg>
      );

    case [45, 48].includes(code) && day:
      return (
        <svg
          className={classname}
          width="120.47264mm"
          height="70.358849mm"
          viewBox="0 0 120.47264 70.358849"
          version="1.1"
          id="svg1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs id="defs1">
            <filter
              id="filter14"
              x="-0.087267592"
              y="-0.20712805"
              width="1.1695955"
              height="1.5005595"
              colorInterpolationFilters="sRGB"
            >
              <feFlood
                result="flood"
                in="SourceGraphic"
                floodOpacity="0.400000"
                floodColor="rgb(208,215,220)"
                id="feFlood13"
              />
              <feGaussianBlur
                result="blur"
                in="SourceGraphic"
                stdDeviation="1.000000"
                id="feGaussianBlur13"
              />
              <feOffset
                result="offset"
                in="blur"
                dx="0.200000"
                dy="1.000000"
                id="feOffset13"
              />
              <feComposite
                result="comp1"
                operator="in"
                in="flood"
                in2="offset"
                id="feComposite13"
              />
              <feComposite
                result="fbSourceGraphic"
                operator="over"
                in="SourceGraphic"
                in2="comp1"
                id="feComposite14"
              />
              <feColorMatrix
                result="fbSourceGraphicAlpha"
                in="fbSourceGraphic"
                values="0 0 0 -1 0 0 0 0 -1 0 0 0 0 -1 0 0 0 0 1 0"
                id="feColorMatrix26"
              />
              <feFlood
                id="feFlood26"
                result="flood"
                in="fbSourceGraphic"
                floodOpacity="0.400000"
                floodColor="rgb(208,215,220)"
              />
              <feGaussianBlur
                id="feGaussianBlur26"
                result="blur"
                in="fbSourceGraphic"
                stdDeviation="1.000000"
              />
              <feOffset
                id="feOffset26"
                result="offset"
                in="blur"
                dx="-0.500000"
                dy="1.000000"
              />
              <feComposite
                id="feComposite26"
                result="comp1"
                operator="in"
                in="flood"
                in2="offset"
              />
              <feComposite
                id="feComposite27"
                result="comp2"
                operator="over"
                in="fbSourceGraphic"
                in2="comp1"
              />
            </filter>
          </defs>
          <g id="layer1" transform="translate(-38.341186,-115.24528)">
            <g
              id="layer1-7"
              filter="url(#filter14)"
              transform="matrix(1.2308622,0,0,1.5468697,-46.998952,-89.116263)"
            >
              <path
                d="m 105.86418,136.91296 c -3.08514,0.009 -5.988723,1.45961 -7.849303,3.92059 -1.21352,-0.68851 -2.58455,-1.05127 -3.97978,-1.05301 -4.46548,-8e-5 -8.08548,3.61992 -8.0854,8.08539 l 6.4e-4,0.008 c -1.24423,-1.26473 -2.90123,-1.97175 -4.62546,-1.97363 -3.69548,0 -6.69126,3.1741 -6.69125,7.08955 0.025,3.68353 2.70826,6.73314 6.17458,7.01748 0.0218,0.0444 0.0588,0.0797 0.11183,0.0797 h 30.761053 11.81305 5.58923 c 0.0534,0 0.0906,-0.0357 0.11228,-0.0806 0.0297,0.004 0.0593,0.008 0.089,0.012 3.35887,-6e-5 6.08175,-2.7997 6.08172,-6.2532 -9e-5,-3.45341 -2.72293,-6.25293 -6.08172,-6.25298 -0.2278,0.0175 -0.45446,0.0482 -0.67889,0.092 -1.18025,-5.27945 -5.74936,-9.02195 -11.01806,-9.02477 -1.67007,0.0146 -3.31628,0.40921 -4.82042,1.15558 -1.844,-1.80653 -4.32194,-2.81937 -6.90338,-2.82172 z"
                fill="#e8eced"
                fillOpacity="1"
                strokeWidth="0.45172"
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                id="path6"
              />
            </g>
            <g
              id="g4"
              filter="url(#filter14)"
              transform="matrix(1.2308622,0,0,1.5468697,-4.3809678,-73.621251)"
            >
              <path
                d="m 98.083583,137.60654 c -3.08514,0.009 -5.988723,1.45961 -7.849303,3.92059 -1.21352,-0.68851 -2.58455,-1.05127 -3.97978,-1.05301 -4.46548,-8e-5 -8.08548,3.61992 -8.0854,8.08539 l 6.4e-4,0.008 c -1.24423,-1.26473 -2.90123,-1.97175 -4.62546,-1.97363 -3.69548,0 -6.69126,3.1741 -6.69125,7.08955 0.025,3.68353 2.70826,6.73314 6.17458,7.01748 0.0218,0.0444 0.0588,0.0797 0.11183,0.0797 h 30.76105 11.81305 5.58923 c 0.0534,0 0.0906,-0.0357 0.11228,-0.0806 0.0297,0.004 0.0593,0.008 0.089,0.012 3.35887,-6e-5 6.08175,-2.7997 6.08172,-6.2532 -9e-5,-3.45341 -2.72293,-6.25293 -6.08172,-6.25298 -0.2278,0.0175 -0.45446,0.0482 -0.67889,0.092 -1.18025,-5.27945 -5.74936,-9.02195 -11.01806,-9.02477 -1.67007,0.0146 -3.31628,0.40921 -4.82042,1.15558 -1.844,-1.80653 -4.32194,-2.81937 -6.903377,-2.82172 z"
                fill="#c8d1d2"
                fillOpacity="1"
                strokeWidth="0.45172"
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                id="path4"
              />
            </g>
          </g>
        </svg>
      );

    case [51, 53, 55, 56, 57, 61, 66, 80].includes(code) && day:
      return (
        <svg
          className={classname}
          width="87.431519mm"
          height="67.275154mm"
          viewBox="0 0 87.431519 67.275154"
          version="1.1"
          id="svg1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs id="defs1">
            <filter
              id="filter14"
              x="-0.087267592"
              y="-0.20712805"
              width="1.1695955"
              height="1.5005595"
              colorInterpolationFilters="sRGB"
            >
              <feFlood
                result="flood"
                in="SourceGraphic"
                floodOpacity="0.400000"
                floodColor="rgb(208,215,220)"
                id="feFlood13"
              />
              <feGaussianBlur
                result="blur"
                in="SourceGraphic"
                stdDeviation="1.000000"
                id="feGaussianBlur13"
              />
              <feOffset
                result="offset"
                in="blur"
                dx="0.200000"
                dy="1.000000"
                id="feOffset13"
              />
              <feComposite
                result="comp1"
                operator="in"
                in="flood"
                in2="offset"
                id="feComposite13"
              />
              <feComposite
                result="fbSourceGraphic"
                operator="over"
                in="SourceGraphic"
                in2="comp1"
                id="feComposite14"
              />
              <feColorMatrix
                result="fbSourceGraphicAlpha"
                in="fbSourceGraphic"
                values="0 0 0 -1 0 0 0 0 -1 0 0 0 0 -1 0 0 0 0 1 0"
                id="feColorMatrix26"
              />
              <feFlood
                id="feFlood26"
                result="flood"
                in="fbSourceGraphic"
                floodOpacity="0.400000"
                floodColor="rgb(208,215,220)"
              />
              <feGaussianBlur
                id="feGaussianBlur26"
                result="blur"
                in="fbSourceGraphic"
                stdDeviation="1.000000"
              />
              <feOffset
                id="feOffset26"
                result="offset"
                in="blur"
                dx="-0.500000"
                dy="1.000000"
              />
              <feComposite
                id="feComposite26"
                result="comp1"
                operator="in"
                in="flood"
                in2="offset"
              />
              <feComposite
                id="feComposite27"
                result="comp2"
                operator="over"
                in="fbSourceGraphic"
                in2="comp1"
              />
            </filter>
          </defs>
          <g id="layer1" transform="translate(-54.861755,-123.52921)">
            <g
              id="g4"
              filter="url(#filter14)"
              transform="matrix(1.2308622,0,0,1.5468697,-20.901539,-81.905196)"
            >
              <path
                d="m 98.083583,137.60654 c -3.08514,0.009 -5.988723,1.45961 -7.849303,3.92059 -1.21352,-0.68851 -2.58455,-1.05127 -3.97978,-1.05301 -4.46548,-8e-5 -8.08548,3.61992 -8.0854,8.08539 l 6.4e-4,0.008 c -1.24423,-1.26473 -2.90123,-1.97175 -4.62546,-1.97363 -3.69548,0 -6.69126,3.1741 -6.69125,7.08955 0.025,3.68353 2.70826,6.73314 6.17458,7.01748 0.0218,0.0444 0.0588,0.0797 0.11183,0.0797 h 30.76105 11.81305 5.58923 c 0.0534,0 0.0906,-0.0357 0.11228,-0.0806 0.0297,0.004 0.0593,0.008 0.089,0.012 3.35887,-6e-5 6.08175,-2.7997 6.08172,-6.2532 -9e-5,-3.45341 -2.72293,-6.25293 -6.08172,-6.25298 -0.2278,0.0175 -0.45446,0.0482 -0.67889,0.092 -1.18025,-5.27945 -5.74936,-9.02195 -11.01806,-9.02477 -1.67007,0.0146 -3.31628,0.40921 -4.82042,1.15558 -1.844,-1.80653 -4.32194,-2.81937 -6.903377,-2.82172 z"
                fill="#c8d1d2"
                fillOpacity="1"
                strokeWidth="0.45172"
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                id="path4"
              />
            </g>
            <path
              fill="none"
              fillOpacity="1"
              stroke="#acfcff"
              strokeWidth="1.165"
              strokeLinecap="round"
              strokeOpacity="1"
              paintOrder="stroke fill markers"
              d="m 77.839481,171.03482 c 0,4.12291 0,8.24582 0,12.36873"
              id="path7"
            />
            <path
              fill="none"
              fillOpacity="1"
              stroke="#acfcff"
              strokeWidth="1.39699"
              strokeLinecap="round"
              strokeOpacity="1"
              paintOrder="stroke fill markers"
              d="m 99.227075,172.32064 c 0,5.92841 0,11.85682 0,17.78523"
              id="path8"
            />
            <path
              fill="none"
              fillOpacity="1"
              stroke="#acfcff"
              strokeWidth="1.165"
              strokeLinecap="round"
              strokeOpacity="1"
              paintOrder="stroke fill markers"
              d="m 121.13003,171.02101 c 0,4.12291 0,8.24582 0,12.36873"
              id="path9"
            />
          </g>
        </svg>
      );

    case [63, 65, 67, 81, 82].includes(code) && day:
      return (
        <svg
          className={classname}
          width="87.431519mm"
          height="73.717201mm"
          viewBox="0 0 87.431519 73.717201"
          version="1.1"
          id="svg1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs id="defs1">
            <filter
              id="filter14"
              x="-0.087267592"
              y="-0.20712805"
              width="1.1695955"
              height="1.5005595"
              colorInterpolationFilters="sRGB"
            >
              <feFlood
                result="flood"
                in="SourceGraphic"
                floodOpacity="0.400000"
                floodColor="rgb(208,215,220)"
                id="feFlood13"
              />
              <feGaussianBlur
                result="blur"
                in="SourceGraphic"
                stdDeviation="1.000000"
                id="feGaussianBlur13"
              />
              <feOffset
                result="offset"
                in="blur"
                dx="0.200000"
                dy="1.000000"
                id="feOffset13"
              />
              <feComposite
                result="comp1"
                operator="in"
                in="flood"
                in2="offset"
                id="feComposite13"
              />
              <feComposite
                result="fbSourceGraphic"
                operator="over"
                in="SourceGraphic"
                in2="comp1"
                id="feComposite14"
              />
              <feColorMatrix
                result="fbSourceGraphicAlpha"
                in="fbSourceGraphic"
                values="0 0 0 -1 0 0 0 0 -1 0 0 0 0 -1 0 0 0 0 1 0"
                id="feColorMatrix26"
              />
              <feFlood
                id="feFlood26"
                result="flood"
                in="fbSourceGraphic"
                floodOpacity="0.400000"
                floodColor="rgb(208,215,220)"
              />
              <feGaussianBlur
                id="feGaussianBlur26"
                result="blur"
                in="fbSourceGraphic"
                stdDeviation="1.000000"
              />
              <feOffset
                id="feOffset26"
                result="offset"
                in="blur"
                dx="-0.500000"
                dy="1.000000"
              />
              <feComposite
                id="feComposite26"
                result="comp1"
                operator="in"
                in="flood"
                in2="offset"
              />
              <feComposite
                id="feComposite27"
                result="comp2"
                operator="over"
                in="fbSourceGraphic"
                in2="comp1"
              />
            </filter>
          </defs>
          <g id="layer1" transform="translate(-54.861755,-123.52921)">
            <g
              id="g4"
              filter="url(#filter14)"
              transform="matrix(1.2308622,0,0,1.5468697,-20.901539,-81.905196)"
            >
              <path
                d="m 98.083583,137.60654 c -3.08514,0.009 -5.988723,1.45961 -7.849303,3.92059 -1.21352,-0.68851 -2.58455,-1.05127 -3.97978,-1.05301 -4.46548,-8e-5 -8.08548,3.61992 -8.0854,8.08539 l 6.4e-4,0.008 c -1.24423,-1.26473 -2.90123,-1.97175 -4.62546,-1.97363 -3.69548,0 -6.69126,3.1741 -6.69125,7.08955 0.025,3.68353 2.70826,6.73314 6.17458,7.01748 0.0218,0.0444 0.0588,0.0797 0.11183,0.0797 h 30.76105 11.81305 5.58923 c 0.0534,0 0.0906,-0.0357 0.11228,-0.0806 0.0297,0.004 0.0593,0.008 0.089,0.012 3.35887,-6e-5 6.08175,-2.7997 6.08172,-6.2532 -9e-5,-3.45341 -2.72293,-6.25293 -6.08172,-6.25298 -0.2278,0.0175 -0.45446,0.0482 -0.67889,0.092 -1.18025,-5.27945 -5.74936,-9.02195 -11.01806,-9.02477 -1.67007,0.0146 -3.31628,0.40921 -4.82042,1.15558 -1.844,-1.80653 -4.32194,-2.81937 -6.903377,-2.82172 z"
                fill="#c8d1d2"
                fillOpacity="1"
                strokeWidth="0.45172"
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                id="path4"
              />
            </g>
            <path
              fill="none"
              fillOpacity="1"
              stroke="#acfcff"
              strokeWidth="1.165"
              strokeLinecap="round"
              strokeOpacity="1"
              paintOrder="stroke fill markers"
              d="m 77.839481,171.03482 c 0,4.12291 0,8.24582 0,12.36873"
              id="path7"
            />
            <path
              fill="none"
              fillOpacity="1"
              stroke="#acfcff"
              strokeWidth="1.39699"
              strokeLinecap="round"
              strokeOpacity="1"
              paintOrder="stroke fill markers"
              d="m 99.227075,172.32064 c 0,5.92841 0,11.85682 0,17.78523"
              id="path8"
            />
            <path
              fill="none"
              fillOpacity="1"
              stroke="#acfcff"
              strokeWidth="1.165"
              strokeLinecap="round"
              strokeOpacity="1"
              paintOrder="stroke fill markers"
              d="m 121.13003,171.02101 c 0,4.12291 0,8.24582 0,12.36873"
              id="path9"
            />
            <path
              fill="none"
              fillOpacity="1"
              stroke="#acfcff"
              strokeWidth="1.39699"
              strokeLinecap="round"
              strokeOpacity="1"
              paintOrder="stroke fill markers"
              d="m 88.146755,175.6705 c 0,5.92841 0,11.85682 0,17.78523"
              id="path10"
            />
            <path
              fill="none"
              fillOpacity="1"
              stroke="#acfcff"
              strokeWidth="1.39699"
              strokeLinecap="round"
              strokeOpacity="1"
              paintOrder="stroke fill markers"
              d="m 110.30739,178.76268 c 0,5.92841 0,11.85682 0,17.78523"
              id="path11"
            />
          </g>
        </svg>
      );

    case [71, 73, 75].includes(code) && day:
      return (
        <svg
          className={classname}
          width="87.431519mm"
          height="66.77169mm"
          viewBox="0 0 87.431519 66.77169"
          version="1.1"
          id="svg1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs id="defs1">
            <filter
              id="filter14"
              x="-0.087267592"
              y="-0.20712805"
              width="1.1695955"
              height="1.5005595"
              colorInterpolationFilters="sRGB"
            >
              <feFlood
                result="flood"
                in="SourceGraphic"
                floodOpacity="0.400000"
                floodColor="rgb(208,215,220)"
                id="feFlood13"
              />
              <feGaussianBlur
                result="blur"
                in="SourceGraphic"
                stdDeviation="1.000000"
                id="feGaussianBlur13"
              />
              <feOffset
                result="offset"
                in="blur"
                dx="0.200000"
                dy="1.000000"
                id="feOffset13"
              />
              <feComposite
                result="comp1"
                operator="in"
                in="flood"
                in2="offset"
                id="feComposite13"
              />
              <feComposite
                result="fbSourceGraphic"
                operator="over"
                in="SourceGraphic"
                in2="comp1"
                id="feComposite14"
              />
              <feColorMatrix
                result="fbSourceGraphicAlpha"
                in="fbSourceGraphic"
                values="0 0 0 -1 0 0 0 0 -1 0 0 0 0 -1 0 0 0 0 1 0"
                id="feColorMatrix26"
              />
              <feFlood
                id="feFlood26"
                result="flood"
                in="fbSourceGraphic"
                floodOpacity="0.400000"
                floodColor="rgb(208,215,220)"
              />
              <feGaussianBlur
                id="feGaussianBlur26"
                result="blur"
                in="fbSourceGraphic"
                stdDeviation="1.000000"
              />
              <feOffset
                id="feOffset26"
                result="offset"
                in="blur"
                dx="-0.500000"
                dy="1.000000"
              />
              <feComposite
                id="feComposite26"
                result="comp1"
                operator="in"
                in="flood"
                in2="offset"
              />
              <feComposite
                id="feComposite27"
                result="comp2"
                operator="over"
                in="fbSourceGraphic"
                in2="comp1"
              />
            </filter>
          </defs>
          <g id="layer1" transform="translate(-54.861755,-123.52922)">
            <g
              id="g4"
              filter="url(#filter14)"
              transform="matrix(1.2308622,0,0,1.5468697,-20.901539,-81.905196)"
            >
              <path
                d="m 98.083583,137.60654 c -3.08514,0.009 -5.988723,1.45961 -7.849303,3.92059 -1.21352,-0.68851 -2.58455,-1.05127 -3.97978,-1.05301 -4.46548,-8e-5 -8.08548,3.61992 -8.0854,8.08539 l 6.4e-4,0.008 c -1.24423,-1.26473 -2.90123,-1.97175 -4.62546,-1.97363 -3.69548,0 -6.69126,3.1741 -6.69125,7.08955 0.025,3.68353 2.70826,6.73314 6.17458,7.01748 0.0218,0.0444 0.0588,0.0797 0.11183,0.0797 h 30.76105 11.81305 5.58923 c 0.0534,0 0.0906,-0.0357 0.11228,-0.0806 0.0297,0.004 0.0593,0.008 0.089,0.012 3.35887,-6e-5 6.08175,-2.7997 6.08172,-6.2532 -9e-5,-3.45341 -2.72293,-6.25293 -6.08172,-6.25298 -0.2278,0.0175 -0.45446,0.0482 -0.67889,0.092 -1.18025,-5.27945 -5.74936,-9.02195 -11.01806,-9.02477 -1.67007,0.0146 -3.31628,0.40921 -4.82042,1.15558 -1.844,-1.80653 -4.32194,-2.81937 -6.903377,-2.82172 z"
                fill="#c8d1d2"
                fillOpacity="1"
                strokeWidth="0.45172"
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                id="path4"
              />
            </g>
            <circle
              id="path11"
              cx="76.035706"
              cy="173.02545"
              r="2.8345006"
              fill="#c0f7f7"
              fillOpacity="1"
              stroke="none"
              strokeWidth="1.165"
              strokeLinecap="round"
              strokeOpacity="1"
              paintOrder="stroke fill markers"
            />
            <circle
              id="circle11"
              cx="82.22007"
              cy="180.05763"
              r="2.8345006"
              fill="#c0f7f7"
              fillOpacity="1"
              stroke="none"
              strokeWidth="1.165"
              strokeLinecap="round"
              strokeOpacity="1"
              paintOrder="stroke fill markers"
            />
            <circle
              id="circle12"
              cx="87.244865"
              cy="173.02545"
              r="2.8345006"
              fill="#c0f7f7"
              fillOpacity="1"
              stroke="none"
              strokeWidth="1.165"
              strokeLinecap="round"
              strokeOpacity="1"
              paintOrder="stroke fill markers"
            />
            <circle
              id="circle13"
              cx="98.454025"
              cy="172.76778"
              r="2.8345006"
              fill="#c0f7f7"
              fillOpacity="1"
              stroke="none"
              strokeWidth="1.165"
              strokeLinecap="round"
              strokeOpacity="1"
              paintOrder="stroke fill markers"
            />
            <circle
              id="circle14"
              cx="109.66318"
              cy="173.02545"
              r="2.8345006"
              fill="#c0f7f7"
              fillOpacity="1"
              stroke="none"
              strokeWidth="1.165"
              strokeLinecap="round"
              strokeOpacity="1"
              paintOrder="stroke fill markers"
            />
            <circle
              id="circle15"
              cx="120.87234"
              cy="172.51009"
              r="2.8345006"
              fill="#c0f7f7"
              fillOpacity="1"
              stroke="none"
              strokeWidth="1.165"
              strokeLinecap="round"
              strokeOpacity="1"
              paintOrder="stroke fill markers"
            />
            <circle
              id="circle16"
              cx="115.7187"
              cy="180.05763"
              r="2.8345006"
              fill="#c0f7f7"
              fillOpacity="1"
              stroke="none"
              strokeWidth="1.165"
              strokeLinecap="round"
              strokeOpacity="1"
              paintOrder="stroke fill markers"
            />
            <circle
              id="circle17"
              cx="104.55249"
              cy="180.05763"
              r="2.8345006"
              fill="#c0f7f7"
              fillOpacity="1"
              stroke="none"
              strokeWidth="1.165"
              strokeLinecap="round"
              strokeOpacity="1"
              paintOrder="stroke fill markers"
            />
            <circle
              id="circle18"
              cx="93.386276"
              cy="180.05763"
              r="2.8345006"
              fill="#c0f7f7"
              fillOpacity="1"
              stroke="none"
              strokeWidth="1.165"
              strokeLinecap="round"
              strokeOpacity="1"
              paintOrder="stroke fill markers"
            />
            <circle
              id="circle19"
              cx="89.950516"
              cy="187.4664"
              r="2.8345006"
              fill="#c0f7f7"
              fillOpacity="1"
              stroke="none"
              strokeWidth="1.165"
              strokeLinecap="round"
              strokeOpacity="1"
              paintOrder="stroke fill markers"
            />
            <circle
              id="circle20"
              cx="100.12895"
              cy="187.4664"
              r="2.8345006"
              fill="#c0f7f7"
              fillOpacity="1"
              stroke="none"
              strokeWidth="1.165"
              strokeLinecap="round"
              strokeOpacity="1"
              paintOrder="stroke fill markers"
            />
            <circle
              id="circle21"
              cx="110.30738"
              cy="187.4664"
              r="2.8345006"
              fill="#c0f7f7"
              fillOpacity="1"
              stroke="none"
              strokeWidth="1.165"
              strokeLinecap="round"
              strokeOpacity="1"
              paintOrder="stroke fill markers"
            />
          </g>
        </svg>
      );

    case [95, 96, 99].includes(code) && day:
      return (
        <svg
          className={classname}
          width="90.979408mm"
          height="121.34705mm"
          viewBox="0 0 90.979408 121.34705"
          version="1.1"
          id="svg1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs id="defs1">
            <filter
              id="filter14"
              x="-0.087267592"
              y="-0.20712805"
              width="1.1695955"
              height="1.5005595"
              colorInterpolationFilters="sRGB"
            >
              <feFlood
                result="flood"
                in="SourceGraphic"
                floodOpacity="0.400000"
                floodColor="rgb(208,215,220)"
                id="feFlood13"
              />
              <feGaussianBlur
                result="blur"
                in="SourceGraphic"
                stdDeviation="1.000000"
                id="feGaussianBlur13"
              />
              <feOffset
                result="offset"
                in="blur"
                dx="0.200000"
                dy="1.000000"
                id="feOffset13"
              />
              <feComposite
                result="comp1"
                operator="in"
                in="flood"
                in2="offset"
                id="feComposite13"
              />
              <feComposite
                result="fbSourceGraphic"
                operator="over"
                in="SourceGraphic"
                in2="comp1"
                id="feComposite14"
              />
              <feColorMatrix
                result="fbSourceGraphicAlpha"
                in="fbSourceGraphic"
                values="0 0 0 -1 0 0 0 0 -1 0 0 0 0 -1 0 0 0 0 1 0"
                id="feColorMatrix26"
              />
              <feFlood
                id="feFlood26"
                result="flood"
                in="fbSourceGraphic"
                floodOpacity="0.400000"
                floodColor="rgb(208,215,220)"
              />
              <feGaussianBlur
                id="feGaussianBlur26"
                result="blur"
                in="fbSourceGraphic"
                stdDeviation="1.000000"
              />
              <feOffset
                id="feOffset26"
                result="offset"
                in="blur"
                dx="-0.500000"
                dy="1.000000"
              />
              <feComposite
                id="feComposite26"
                result="comp1"
                operator="in"
                in="flood"
                in2="offset"
              />
              <feComposite
                id="feComposite27"
                result="comp2"
                operator="over"
                in="fbSourceGraphic"
                in2="comp1"
              />
            </filter>
          </defs>
          <g id="layer1" transform="translate(-54.861759,-123.52921)">
            <g
              id="g4"
              filter="url(#filter14)"
              transform="matrix(1.2308622,0,0,1.5468697,-20.901539,-81.905196)"
            >
              <path
                d="m 98.083583,137.60654 c -3.08514,0.009 -5.988723,1.45961 -7.849303,3.92059 -1.21352,-0.68851 -2.58455,-1.05127 -3.97978,-1.05301 -4.46548,-8e-5 -8.08548,3.61992 -8.0854,8.08539 l 6.4e-4,0.008 c -1.24423,-1.26473 -2.90123,-1.97175 -4.62546,-1.97363 -3.69548,0 -6.69126,3.1741 -6.69125,7.08955 0.025,3.68353 2.70826,6.73314 6.17458,7.01748 0.0218,0.0444 0.0588,0.0797 0.11183,0.0797 h 30.76105 11.81305 5.58923 c 0.0534,0 0.0906,-0.0357 0.11228,-0.0806 0.0297,0.004 0.0593,0.008 0.089,0.012 3.35887,-6e-5 6.08175,-2.7997 6.08172,-6.2532 -9e-5,-3.45341 -2.72293,-6.25293 -6.08172,-6.25298 -0.2278,0.0175 -0.45446,0.0482 -0.67889,0.092 -1.18025,-5.27945 -5.74936,-9.02195 -11.01806,-9.02477 -1.67007,0.0146 -3.31628,0.40921 -4.82042,1.15558 -1.844,-1.80653 -4.32194,-2.81937 -6.903377,-2.82172 z"
                fill="#c8d1d2"
                fillOpacity="1"
                strokeWidth="0.45172"
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                id="path4"
              />
            </g>
            <g
              id="g13"
              transform="matrix(0.36753145,0,0,0.36689777,39.26902,138.63734)"
            >
              <path
                opacity="1"
                fill="#ffff09"
                fillOpacity="1"
                stroke="#fefffe"
                strokeWidth="1.165"
                strokeLinecap="round"
                strokeOpacity="1"
                paintOrder="stroke fill markers"
                d="m 110.51153,77.50408 -5.04604,7.8613 1.8066,5.663488 -2.17408,4.625132 2.03871,4.308389 -0.38715,6.268091 3.80743,4.72766 -1.37244,8.83275 1.07128,3.69142 -5.07602,10.13776 -1.55569,1.36674 -0.73215,3.40275 -5.677095,7.42593 5.885925,15.71278 -4.235076,0.94556 -0.156687,12.05354 -1.761312,3.14446 c 0.681556,2.32238 1.363112,4.64475 2.044668,6.96713 1.100877,3.75121 2.201757,7.50241 3.302637,11.25362 l 1.41322,0.55311 -1.82482,17.84788 5.12325,-19.4413 -3.40837,-2.18153 -3.28447,-13.08935 1.61622,-14.06052 5.67163,-5.70785 -6.12604,-15.10811 4.20164,-3.94768 0.004,-2.82533 2.73321,-3.40887 2.24408,-4.28011 2.48115,-3.62478 -0.22378,-6.14726 1.60244,-3.45254 -0.3181,-3.12518 -0.87865,-4.21127 -3.17111,-5.16328 0.28541,-6.427751 -0.60121,-1.03065 1.49502,-5.955916 -1.73911,-6.293964 4.11322,-6.813349 z"
                id="path3"
              />
              <path
                opacity="1"
                fill="none"
                stroke="#ffff01"
                strokeWidth="1.165"
                strokeLinecap="round"
                strokeOpacity="1"
                paintOrder="stroke fill markers"
                d="m 113.76097,111.78752 3.57014,1.63896 2.05502,3.3485 3.95756,1.01475 0.0624,0.86254 4.72645,0.50388 0.53535,1.97172 4.15255,-0.39205 1.13921,2.66056 3.03706,-0.13909 2.26954,3.33124"
                id="path4-2"
              />
              <path
                opacity="1"
                fill="none"
                stroke="#ffff01"
                strokeWidth="1.165"
                strokeLinecap="round"
                strokeOpacity="1"
                paintOrder="stroke fill markers"
                d="m 113.13974,126.61814 v 0 l 2.99843,0.56225 -1.12687,3.39229 1.58424,0.62878 -1.34963,2.34987 2.92204,3.07333 0.66072,3.59185 4.69548,2.01334 4.07344,-0.56238 1.83765,1.1868 3.19394,0.98917 2.5359,3.18685"
                id="path5"
              />
              <path
                opacity="1"
                fill="none"
                stroke="#ffff01"
                strokeWidth="1.165"
                strokeLinecap="round"
                strokeOpacity="1"
                paintOrder="stroke fill markers"
                d="m 123.52415,142.22985 -0.35293,2.35586 1.55643,1.85539 -3.109,3.63334 0.41416,5.39176 -3.24824,2.34193"
                id="path6"
              />
              <path
                opacity="1"
                fill="none"
                stroke="#ffff01"
                strokeWidth="1.165"
                strokeLinecap="round"
                strokeOpacity="1"
                paintOrder="stroke fill markers"
                d="m 122.03281,155.4662 5.63696,2.96459 3.4727,2.31371 -0.49891,3.24323 8.58131,1.81209 5.05079,10.32643 6.95747,0.43387"
                id="path7"
              />
              <path
                opacity="1"
                fill="none"
                stroke="#ffff01"
                strokeWidth="1.165"
                strokeLinecap="round"
                strokeOpacity="1"
                paintOrder="stroke fill markers"
                d="m 110.20175,114.9942 -6.32331,1.63095 c 0.11152,1.19582 -0.32788,2.43196 -1.16915,3.2891 -0.84126,0.85714 -2.06897,1.31957 -3.266667,1.23043 -0.329791,-0.0245 -0.656614,-0.0887 -0.97119,-0.19075 l -0.556098,6.75486 -4.25468,0.19271 -1.62192,1.8541 -6.64696,0.92153"
                id="path8"
              />
              <path
                opacity="1"
                fill="none"
                stroke="#ffff01"
                strokeWidth="1.165"
                strokeLinecap="round"
                strokeOpacity="1"
                paintOrder="stroke fill markers"
                d="m 97.915335,127.70879 2.711585,5.32089 -1.917957,6.10167 -5.579298,1.91444 -1.251871,1.71102"
                id="path9"
              />
              <path
                opacity="1"
                fill="none"
                stroke="#ffff01"
                strokeWidth="1.165"
                strokeLinecap="round"
                strokeOpacity="1"
                paintOrder="stroke fill markers"
                d="m 128.07766,159.33121 0.22548,14.59651 -5.68058,2.61677 -6.33107,0.32696"
                id="path10"
              />
              <path
                opacity="1"
                fill="none"
                stroke="#ffff01"
                strokeWidth="1.165"
                strokeLinecap="round"
                strokeOpacity="1"
                paintOrder="stroke fill markers"
                d="m 124.56136,175.45728 0.31349,5.78662 -2.4478,6.68819 -4.14595,6.5736"
                id="path11"
              />
              <path
                opacity="1"
                fill="none"
                stroke="#ffff01"
                strokeWidth="1.165"
                strokeLinecap="round"
                strokeOpacity="1"
                paintOrder="stroke fill markers"
                d="m 128.4721,170.25477 4.159,2.90536 -0.88905,5.53023 3.03386,5.61698 0.045,6.22594 -0.93203,1.7399 0.89055,5.40344 -2.80993,4.17945 1.11198,4.03907"
                id="path12"
              />
              <path
                opacity="1"
                fill="none"
                stroke="#ffff01"
                strokeWidth="1.165"
                strokeLinecap="round"
                strokeOpacity="1"
                paintOrder="stroke fill markers"
                d="m 99.988311,150.35898 c -0.620329,1.03547 -1.779557,1.7269 -2.985426,1.78068 -1.10013,0.0491 -2.212136,-0.42822 -2.934431,-1.25947 l -7.04397,4.76029 -0.161049,2.65377 -6.059342,-0.72917 -1.813213,1.76713 -1.907837,-0.53955 -4.220009,1.3731 -4.636111,-2.30857 -6.276088,2.24803"
                id="path13"
              />
            </g>
            <g
              id="g31"
              transform="matrix(-0.61850189,0,0,0.56902544,183.7976,122.8533)"
            >
              <path
                opacity="1"
                fill="#ffff09"
                fillOpacity="1"
                stroke="#fefffe"
                strokeWidth="1.165"
                strokeLinecap="round"
                strokeOpacity="1"
                paintOrder="stroke fill markers"
                d="m 110.51153,77.50408 -5.04604,7.8613 1.8066,5.663488 -2.17408,4.625132 2.03871,4.308389 -0.38715,6.268091 3.80743,4.72766 -1.37244,8.83275 1.07128,3.69142 -5.07602,10.13776 -1.55569,1.36674 -0.73215,3.40275 -5.677095,7.42593 5.885925,15.71278 -4.235076,0.94556 -0.156687,12.05354 -1.761312,3.14446 c 0.681556,2.32238 1.363112,4.64475 2.044668,6.96713 1.100877,3.75121 2.201757,7.50241 3.302637,11.25362 l 1.41322,0.55311 -1.82482,17.84788 5.12325,-19.4413 -3.40837,-2.18153 -3.28447,-13.08935 1.61622,-14.06052 5.67163,-5.70785 -6.12604,-15.10811 4.20164,-3.94768 0.004,-2.82533 2.73321,-3.40887 2.24408,-4.28011 2.48115,-3.62478 -0.22378,-6.14726 1.60244,-3.45254 -0.3181,-3.12518 -0.87865,-4.21127 -3.17111,-5.16328 0.28541,-6.427751 -0.60121,-1.03065 1.49502,-5.955916 -1.73911,-6.293964 4.11322,-6.813349 z"
                id="path21"
              />
              <path
                opacity="1"
                fill="none"
                stroke="#ffff01"
                strokeWidth="1.165"
                strokeLinecap="round"
                strokeOpacity="1"
                paintOrder="stroke fill markers"
                d="m 113.76097,111.78752 3.57014,1.63896 2.05502,3.3485 3.95756,1.01475 0.0624,0.86254 4.72645,0.50388 0.53535,1.97172 4.15255,-0.39205 1.13921,2.66056 3.03706,-0.13909 2.26954,3.33124"
                id="path22"
              />
              <path
                opacity="1"
                fill="none"
                stroke="#ffff01"
                strokeWidth="1.165"
                strokeLinecap="round"
                strokeOpacity="1"
                paintOrder="stroke fill markers"
                d="m 113.13974,126.61814 v 0 l 2.99843,0.56225 -1.12687,3.39229 1.58424,0.62878 -1.34963,2.34987 2.92204,3.07333 0.66072,3.59185 4.69548,2.01334 4.07344,-0.56238 1.83765,1.1868 3.19394,0.98917 2.5359,3.18685"
                id="path23"
              />
              <path
                opacity="1"
                fill="none"
                stroke="#ffff01"
                strokeWidth="1.165"
                strokeLinecap="round"
                strokeOpacity="1"
                paintOrder="stroke fill markers"
                d="m 123.52415,142.22985 -0.35293,2.35586 1.55643,1.85539 -3.109,3.63334 0.41416,5.39176 -3.24824,2.34193"
                id="path24"
              />
              <path
                opacity="1"
                fill="none"
                stroke="#ffff01"
                strokeWidth="1.165"
                strokeLinecap="round"
                strokeOpacity="1"
                paintOrder="stroke fill markers"
                d="m 122.03281,155.4662 5.63696,2.96459 3.4727,2.31371 -0.49891,3.24323 8.58131,1.81209 5.05079,10.32643 6.95747,0.43387"
                id="path25"
              />
              <path
                opacity="1"
                fill="none"
                stroke="#ffff01"
                strokeWidth="1.165"
                strokeLinecap="round"
                strokeOpacity="1"
                paintOrder="stroke fill markers"
                d="m 110.20175,114.9942 -6.32331,1.63095 c 0.11152,1.19582 -0.32788,2.43196 -1.16915,3.2891 -0.84126,0.85714 -2.06897,1.31957 -3.266667,1.23043 -0.329791,-0.0245 -0.656614,-0.0887 -0.97119,-0.19075 l -0.556098,6.75486 -4.25468,0.19271 -1.62192,1.8541 -6.64696,0.92153"
                id="path26"
              />
              <path
                opacity="1"
                fill="none"
                stroke="#ffff01"
                strokeWidth="1.165"
                strokeLinecap="round"
                strokeOpacity="1"
                paintOrder="stroke fill markers"
                d="m 97.915335,127.70879 2.711585,5.32089 -1.917957,6.10167 -5.579298,1.91444 -1.251871,1.71102"
                id="path27"
              />
              <path
                opacity="1"
                fill="none"
                stroke="#ffff01"
                strokeWidth="1.165"
                strokeLinecap="round"
                strokeOpacity="1"
                paintOrder="stroke fill markers"
                d="m 128.07766,159.33121 0.22548,14.59651 -5.68058,2.61677 -6.33107,0.32696"
                id="path28"
              />
              <path
                opacity="1"
                fill="none"
                stroke="#ffff01"
                strokeWidth="1.165"
                strokeLinecap="round"
                strokeOpacity="1"
                paintOrder="stroke fill markers"
                d="m 124.56136,175.45728 0.31349,5.78662 -2.4478,6.68819 -4.14595,6.5736"
                id="path29"
              />
              <path
                opacity="1"
                fill="none"
                stroke="#ffff01"
                strokeWidth="1.165"
                strokeLinecap="round"
                strokeOpacity="1"
                paintOrder="stroke fill markers"
                d="m 128.4721,170.25477 4.159,2.90536 -0.88905,5.53023 3.03386,5.61698 0.045,6.22594 -0.93203,1.7399 0.89055,5.40344 -2.80993,4.17945 1.11198,4.03907"
                id="path30"
              />
              <path
                opacity="1"
                fill="none"
                stroke="#ffff01"
                strokeWidth="1.165"
                strokeLinecap="round"
                strokeOpacity="1"
                paintOrder="stroke fill markers"
                d="m 99.988311,150.35898 c -0.620329,1.03547 -1.779557,1.7269 -2.985426,1.78068 -1.10013,0.0491 -2.212136,-0.42822 -2.934431,-1.25947 l -7.04397,4.76029 -0.161049,2.65377 -6.059342,-0.72917 -1.813213,1.76713 -1.907837,-0.53955 -4.220009,1.3731 -4.636111,-2.30857 -6.276088,2.24803"
                id="path31"
              />
            </g>
          </g>
        </svg>
      );

    case [95, 96, 99].includes(code) && !day:
      return (
        <svg
          width="100.95611mm"
          height="131.67422mm"
          viewBox="0 0 100.95611 131.67422"
          version="1.1"
          id="svg1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs id="defs1">
            <filter
              colorInterpolationFilters="sRGB"
              id="filter283"
              x="-0.016492966"
              y="-0.014974274"
              width="1.0329859"
              height="1.0299485"
            >
              <feGaussianBlur
                stdDeviation="0.61 0.61"
                result="blur"
                id="feGaussianBlur283"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              id="filter284"
              x="-0.027980103"
              y="-0.015280957"
              width="1.0559602"
              height="1.0305619"
            >
              <feGaussianBlur
                stdDeviation="0.61 0.61"
                result="blur"
                id="feGaussianBlur284"
              />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              id="filter14-1"
              x="-0.087267592"
              y="-0.20712805"
              width="1.1695955"
              height="1.5005595"
            >
              <feFlood
                result="flood"
                in="SourceGraphic"
                floodOpacity="0.400000"
                floodColor="rgb(208,215,220)"
                id="feFlood13-2"
              />
              <feGaussianBlur
                result="blur"
                in="SourceGraphic"
                stdDeviation="1.000000"
                id="feGaussianBlur13-3"
              />
              <feOffset
                result="offset"
                in="blur"
                dx="0.200000"
                dy="1.000000"
                id="feOffset13-3"
              />
              <feComposite
                result="comp1"
                operator="in"
                in="flood"
                in2="offset"
                id="feComposite13-4"
              />
              <feComposite
                result="fbSourceGraphic"
                operator="over"
                in="SourceGraphic"
                in2="comp1"
                id="feComposite14-1"
              />
              <feColorMatrix
                result="fbSourceGraphicAlpha"
                in="fbSourceGraphic"
                values="0 0 0 -1 0 0 0 0 -1 0 0 0 0 -1 0 0 0 0 1 0"
                id="feColorMatrix26-1"
              />
              <feFlood
                id="feFlood26-3"
                result="flood"
                in="fbSourceGraphic"
                floodOpacity="0.400000"
                floodColor="rgb(208,215,220)"
              />
              <feGaussianBlur
                id="feGaussianBlur26-87"
                result="blur"
                in="fbSourceGraphic"
                stdDeviation="1.000000"
              />
              <feOffset
                id="feOffset26-4"
                result="offset"
                in="blur"
                dx="-0.500000"
                dy="1.000000"
              />
              <feComposite
                id="feComposite26-27"
                result="comp1"
                operator="in"
                in="flood"
                in2="offset"
              />
              <feComposite
                id="feComposite27-79"
                result="comp2"
                operator="over"
                in="fbSourceGraphic"
                in2="comp1"
              />
            </filter>
          </defs>

          <g id="layer1" transform="translate(-49.230063,-115.48443)">
            <g id="g5">
              <path
                d="m 114.25969,119.17104 a 52.302872,52.002354 0 0 1 25.19949,44.46137 52.302872,52.002354 0 0 1 -43.059897,51.0837 49.014111,49.014111 0 0 0 3.30884,0.26045 49.014111,49.014111 0 0 0 49.014057,-49.01406 49.014111,49.014111 0 0 0 -34.46249,-46.79146 z"
                fill="#ffff00"
                fillOpacity={1}
                strokeWidth={1.165}
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                filter="url(#filter284)"
                id="path4"
              />
              <path
                d="m 114.25969,119.17104 a 49.014111,49.014111 0 0 0 -14.551567,-2.22261 49.014111,49.014111 0 0 0 -49.01406,49.01407 49.014111,49.014111 0 0 0 45.70522,48.75361 52.302872,52.002354 0 0 0 43.059897,-51.0837 52.302872,52.002354 0 0 0 -25.19949,-44.46137 z"
                fill="#3d4a52"
                fillOpacity={1}
                strokeWidth={1.165}
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                filter="url(#filter283)"
                id="path5"
              />
            </g>
          </g>

          <g
            id="layer1-1"
            transform="matrix(0.36655707,0,0,0.36655707,-3.9380434,39.142126)"
          >
            <g
              id="g4"
              fill="#a5a5a5"
              fillOpacity={1}
              filter="url(#filter14-1)"
              transform="matrix(1.2308622,0,0,1.5468697,-20.901539,-81.905196)"
            >
              <path
                d="m 98.083583,137.60654 c -3.08514,0.009 -5.988723,1.45961 -7.849303,3.92059 -1.21352,-0.68851 -2.58455,-1.05127 -3.97978,-1.05301 -4.46548,-8e-5 -8.08548,3.61992 -8.0854,8.08539 l 6.4e-4,0.008 c -1.24423,-1.26473 -2.90123,-1.97175 -4.62546,-1.97363 -3.69548,0 -6.69126,3.1741 -6.69125,7.08955 0.025,3.68353 2.70826,6.73314 6.17458,7.01748 0.0218,0.0444 0.0588,0.0797 0.11183,0.0797 h 30.76105 11.81305 5.58923 c 0.0534,0 0.0906,-0.0357 0.11228,-0.0806 0.0297,0.004 0.0593,0.008 0.089,0.012 3.35887,-6e-5 6.08175,-2.7997 6.08172,-6.2532 -9e-5,-3.45341 -2.72293,-6.25293 -6.08172,-6.25298 -0.2278,0.0175 -0.45446,0.0482 -0.67889,0.092 -1.18025,-5.27945 -5.74936,-9.02195 -11.01806,-9.02477 -1.67007,0.0146 -3.31628,0.40921 -4.82042,1.15558 -1.844,-1.80653 -4.32194,-2.81937 -6.903377,-2.82172 z"
                fill="#a5a5a5"
                fillOpacity={1}
                strokeWidth={0.45172}
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                id="path4-9"
              />
            </g>

            <g
              id="g13"
              transform="matrix(0.36753145,0,0,0.36689777,39.26902,138.63734)"
            >
              <path
                opacity={1}
                fill="#ffff09"
                fillOpacity={1}
                stroke="#fefffe"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 110.51153,77.50408 -5.04604,7.8613 1.8066,5.663488 -2.17408,4.625132 2.03871,4.308389 -0.38715,6.268091 3.80743,4.72766 -1.37244,8.83275 1.07128,3.69142 -5.07602,10.13776 -1.55569,1.36674 -0.73215,3.40275 -5.677095,7.42593 5.885925,15.71278 -4.235076,0.94556 -0.156687,12.05354 -1.761312,3.14446 c 0.681556,2.32238 1.363112,4.64475 2.044668,6.96713 1.100877,3.75121 2.201757,7.50241 3.302637,11.25362 l 1.41322,0.55311 -1.82482,17.84788 5.12325,-19.4413 -3.40837,-2.18153 -3.28447,-13.08935 1.61622,-14.06052 5.67163,-5.70785 -6.12604,-15.10811 4.20164,-3.94768 0.004,-2.82533 2.73321,-3.40887 2.24408,-4.28011 2.48115,-3.62478 -0.22378,-6.14726 1.60244,-3.45254 -0.3181,-3.12518 -0.87865,-4.21127 -3.17111,-5.16328 0.28541,-6.427751 -0.60121,-1.03065 1.49502,-5.955916 -1.73911,-6.293964 4.11322,-6.813349 z"
                id="path3"
              />
              <path
                opacity={1}
                fill="none"
                fillOpacity={1}
                stroke="#ffff01"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 113.76097,111.78752 3.57014,1.63896 2.05502,3.3485 3.95756,1.01475 0.0624,0.86254 4.72645,0.50388 0.53535,1.97172 4.15255,-0.39205 1.13921,2.66056 3.03706,-0.13909 2.26954,3.33124"
                id="path4-2"
              />
              <path
                opacity={1}
                fill="none"
                fillOpacity={1}
                stroke="#ffff01"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 113.13974,126.61814 v 0 l 2.99843,0.56225 -1.12687,3.39229 1.58424,0.62878 -1.34963,2.34987 2.92204,3.07333 0.66072,3.59185 4.69548,2.01334 4.07344,-0.56238 1.83765,1.1868 3.19394,0.98917 2.5359,3.18685"
                id="path5-8"
              />
              <path
                opacity={1}
                fill="none"
                fillOpacity={1}
                stroke="#ffff01"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 123.52415,142.22985 -0.35293,2.35586 1.55643,1.85539 -3.109,3.63334 0.41416,5.39176 -3.24824,2.34193"
                id="path6"
              />
              <path
                opacity={1}
                fill="none"
                fillOpacity={1}
                stroke="#ffff01"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 122.03281,155.4662 5.63696,2.96459 3.4727,2.31371 -0.49891,3.24323 8.58131,1.81209 5.05079,10.32643 6.95747,0.43387"
                id="path7"
              />
              <path
                opacity={1}
                fill="none"
                fillOpacity={1}
                stroke="#ffff01"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 110.20175,114.9942 -6.32331,1.63095 c 0.11152,1.19582 -0.32788,2.43196 -1.16915,3.2891 -0.84126,0.85714 -2.06897,1.31957 -3.266667,1.23043 -0.329791,-0.0245 -0.656614,-0.0887 -0.97119,-0.19075 l -0.556098,6.75486 -4.25468,0.19271 -1.62192,1.8541 -6.64696,0.92153"
                id="path8"
              />
              <path
                opacity={1}
                fill="none"
                fillOpacity={1}
                stroke="#ffff01"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 97.915335,127.70879 2.711585,5.32089 -1.917957,6.10167 -5.579298,1.91444 -1.251871,1.71102"
                id="path9"
              />
              <path
                opacity={1}
                fill="none"
                fillOpacity={1}
                stroke="#ffff01"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 128.07766,159.33121 0.22548,14.59651 -5.68058,2.61677 -6.33107,0.32696"
                id="path10"
              />
              <path
                opacity={1}
                fill="none"
                fillOpacity={1}
                stroke="#ffff01"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 124.56136,175.45728 0.31349,5.78662 -2.4478,6.68819 -4.14595,6.5736"
                id="path11"
              />
              <path
                opacity={1}
                fill="none"
                fillOpacity={1}
                stroke="#ffff01"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 128.4721,170.25477 4.159,2.90536 -0.88905,5.53023 3.03386,5.61698 0.045,6.22594 -0.93203,1.7399 0.89055,5.40344 -2.80993,4.17945 1.11198,4.03907"
                id="path12"
              />
              <path
                opacity={1}
                fill="none"
                fillOpacity={1}
                stroke="#ffff01"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 99.988311,150.35898 c -0.620329,1.03547 -1.779557,1.7269 -2.985426,1.78068 -1.10013,0.0491 -2.212136,-0.42822 -2.934431,-1.25947 l -7.04397,4.76029 -0.161049,2.65377 -6.059342,-0.72917 -1.813213,1.76713 -1.907837,-0.53955 -4.220009,1.3731 -4.636111,-2.30857 -6.276088,2.24803"
                id="path13"
              />
            </g>

            <g
              id="g31"
              transform="matrix(-0.61850189,0,0,0.56902544,183.7976,122.8533)"
            >
              <path
                opacity={1}
                fill="#ffff09"
                fillOpacity={1}
                stroke="#fefffe"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 110.51153,77.50408 -5.04604,7.8613 1.8066,5.663488 -2.17408,4.625132 2.03871,4.308389 -0.38715,6.268091 3.80743,4.72766 -1.37244,8.83275 1.07128,3.69142 -5.07602,10.13776 -1.55569,1.36674 -0.73215,3.40275 -5.677095,7.42593 5.885925,15.71278 -4.235076,0.94556 -0.156687,12.05354 -1.761312,3.14446 c 0.681556,2.32238 1.363112,4.64475 2.044668,6.96713 1.100877,3.75121 2.201757,7.50241 3.302637,11.25362 l 1.41322,0.55311 -1.82482,17.84788 5.12325,-19.4413 -3.40837,-2.18153 -3.28447,-13.08935 1.61622,-14.06052 5.67163,-5.70785 -6.12604,-15.10811 4.20164,-3.94768 0.004,-2.82533 2.73321,-3.40887 2.24408,-4.28011 2.48115,-3.62478 -0.22378,-6.14726 1.60244,-3.45254 -0.3181,-3.12518 -0.87865,-4.21127 -3.17111,-5.16328 0.28541,-6.427751 -0.60121,-1.03065 1.49502,-5.955916 -1.73911,-6.293964 4.11322,-6.813349 z"
                id="path21"
              />
              <path
                opacity={1}
                fill="none"
                fillOpacity={1}
                stroke="#ffff01"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 113.76097,111.78752 3.57014,1.63896 2.05502,3.3485 3.95756,1.01475 0.0624,0.86254 4.72645,0.50388 0.53535,1.97172 4.15255,-0.39205 1.13921,2.66056 3.03706,-0.13909 2.26954,3.33124"
                id="path22"
              />
              <path
                opacity={1}
                fill="none"
                fillOpacity={1}
                stroke="#ffff01"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 113.13974,126.61814 v 0 l 2.99843,0.56225 -1.12687,3.39229 1.58424,0.62878 -1.34963,2.34987 2.92204,3.07333 0.66072,3.59185 4.69548,2.01334 4.07344,-0.56238 1.83765,1.1868 3.19394,0.98917 2.5359,3.18685"
                id="path23"
              />
              <path
                opacity={1}
                fill="none"
                fillOpacity={1}
                stroke="#ffff01"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 123.52415,142.22985 -0.35293,2.35586 1.55643,1.85539 -3.109,3.63334 0.41416,5.39176 -3.24824,2.34193"
                id="path24"
              />
              <path
                opacity={1}
                fill="none"
                fillOpacity={1}
                stroke="#ffff01"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 122.03281,155.4662 5.63696,2.96459 3.4727,2.31371 -0.49891,3.24323 8.58131,1.81209 5.05079,10.32643 6.95747,0.43387"
                id="path39"
              />
              <path
                opacity={1}
                fill="none"
                fillOpacity={1}
                stroke="#ffff01"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 110.20175,114.9942 -6.32331,1.63095 c 0.11152,1.19582 -0.32788,2.43196 -1.16915,3.2891 -0.84126,0.85714 -2.06897,1.31957 -3.266667,1.23043 -0.329791,-0.0245 -0.656614,-0.0887 -0.97119,-0.19075 l -0.556098,6.75486 -4.25468,0.19271 -1.62192,1.8541 -6.64696,0.92153"
                id="path40"
              />
              <path
                opacity={1}
                fill="none"
                fillOpacity={1}
                stroke="#ffff01"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 97.915335,127.70879 2.711585,5.32089 -1.917957,6.10167 -5.579298,1.91444 -1.251871,1.71102"
                id="path41"
              />
              <path
                opacity={1}
                fill="none"
                fillOpacity={1}
                stroke="#ffff01"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 128.07766,159.33121 0.22548,14.59651 -5.68058,2.61677 -6.33107,0.32696"
                id="path42"
              />
              <path
                opacity={1}
                fill="none"
                fillOpacity={1}
                stroke="#ffff01"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 124.56136,175.45728 0.31349,5.78662 -2.4478,6.68819 -4.14595,6.5736"
                id="path43"
              />
              <path
                opacity={1}
                fill="none"
                fillOpacity={1}
                stroke="#ffff01"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 128.4721,170.25477 4.159,2.90536 -0.88905,5.53023 3.03386,5.61698 0.045,6.22594 -0.93203,1.7399 0.89055,5.40344 -2.80993,4.17945 1.11198,4.03907"
                id="path44"
              />
              <path
                opacity={1}
                fill="none"
                fillOpacity={1}
                stroke="#ffff01"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 99.988311,150.35898 c -0.620329,1.03547 -1.779557,1.7269 -2.985426,1.78068 -1.10013,0.0491 -2.212136,-0.42822 -2.934431,-1.25947 l -7.04397,4.76029 -0.161049,2.65377 -6.059342,-0.72917 -1.813213,1.76713 -1.907837,-0.53955 -4.220009,1.3731 -4.636111,-2.30857 -6.276088,2.24803"
                id="path45"
              />
            </g>
          </g>

          <g
            id="g46"
            transform="matrix(0.48259161,0,0,0.48259161,17.172598,13.498982)"
          >
            <g
              id="g1"
              fill="#a5a5a5"
              fillOpacity={1}
              filter="url(#filter14-1)"
              transform="matrix(1.2308622,0,0,1.5468697,-20.901539,-81.905196)"
            >
              <path
                d="m 98.083583,137.60654 c -3.08514,0.009 -5.988723,1.45961 -7.849303,3.92059 -1.21352,-0.68851 -2.58455,-1.05127 -3.97978,-1.05301 -4.46548,-8e-5 -8.08548,3.61992 -8.0854,8.08539 l 6.4e-4,0.008 c -1.24423,-1.26473 -2.90123,-1.97175 -4.62546,-1.97363 -3.69548,0 -6.69126,3.1741 -6.69125,7.08955 0.025,3.68353 2.70826,6.73314 6.17458,7.01748 0.0218,0.0444 0.0588,0.0797 0.11183,0.0797 h 30.76105 11.81305 5.58923 c 0.0534,0 0.0906,-0.0357 0.11228,-0.0806 0.0297,0.004 0.0593,0.008 0.089,0.012 3.35887,-6e-5 6.08175,-2.7997 6.08172,-6.2532 -9e-5,-3.45341 -2.72293,-6.25293 -6.08172,-6.25298 -0.2278,0.0175 -0.45446,0.0482 -0.67889,0.092 -1.18025,-5.27945 -5.74936,-9.02195 -11.01806,-9.02477 -1.67007,0.0146 -3.31628,0.40921 -4.82042,1.15558 -1.844,-1.80653 -4.32194,-2.81937 -6.903377,-2.82172 z"
                fill="#a5a5a5"
                fillOpacity={1}
                strokeWidth={0.45172}
                strokeLinecap="round"
                paintOrder="stroke fill markers"
                id="path1"
              />
            </g>

            <g
              id="g34"
              transform="matrix(0.36753145,0,0,0.36689777,39.26902,138.63734)"
            >
              <path
                opacity={1}
                fill="#ffff09"
                fillOpacity={1}
                stroke="#fefffe"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 110.51153,77.50408 -5.04604,7.8613 1.8066,5.663488 -2.17408,4.625132 2.03871,4.308389 -0.38715,6.268091 3.80743,4.72766 -1.37244,8.83275 1.07128,3.69142 -5.07602,10.13776 -1.55569,1.36674 -0.73215,3.40275 -5.677095,7.42593 5.885925,15.71278 -4.235076,0.94556 -0.156687,12.05354 -1.761312,3.14446 c 0.681556,2.32238 1.363112,4.64475 2.044668,6.96713 1.100877,3.75121 2.201757,7.50241 3.302637,11.25362 l 1.41322,0.55311 -1.82482,17.84788 5.12325,-19.4413 -3.40837,-2.18153 -3.28447,-13.08935 1.61622,-14.06052 5.67163,-5.70785 -6.12604,-15.10811 4.20164,-3.94768 0.004,-2.82533 2.73321,-3.40887 2.24408,-4.28011 2.48115,-3.62478 -0.22378,-6.14726 1.60244,-3.45254 -0.3181,-3.12518 -0.87865,-4.21127 -3.17111,-5.16328 0.28541,-6.427751 -0.60121,-1.03065 1.49502,-5.955916 -1.73911,-6.293964 4.11322,-6.813349 z"
                id="path2"
              />
              <path
                opacity={1}
                fill="none"
                fillOpacity={1}
                stroke="#ffff01"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 113.76097,111.78752 3.57014,1.63896 2.05502,3.3485 3.95756,1.01475 0.0624,0.86254 4.72645,0.50388 0.53535,1.97172 4.15255,-0.39205 1.13921,2.66056 3.03706,-0.13909 2.26954,3.33124"
                id="path14"
              />
              <path
                opacity={1}
                fill="none"
                fillOpacity={1}
                stroke="#ffff01"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 113.13974,126.61814 v 0 l 2.99843,0.56225 -1.12687,3.39229 1.58424,0.62878 -1.34963,2.34987 2.92204,3.07333 0.66072,3.59185 4.69548,2.01334 4.07344,-0.56238 1.83765,1.1868 3.19394,0.98917 2.5359,3.18685"
                id="path15"
              />
              <path
                opacity={1}
                fill="none"
                fillOpacity={1}
                stroke="#ffff01"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 123.52415,142.22985 -0.35293,2.35586 1.55643,1.85539 -3.109,3.63334 0.41416,5.39176 -3.24824,2.34193"
                id="path16"
              />
              <path
                opacity={1}
                fill="none"
                fillOpacity={1}
                stroke="#ffff01"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 122.03281,155.4662 5.63696,2.96459 3.4727,2.31371 -0.49891,3.24323 8.58131,1.81209 5.05079,10.32643 6.95747,0.43387"
                id="path17"
              />
              <path
                opacity={1}
                fill="none"
                fillOpacity={1}
                stroke="#ffff01"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 110.20175,114.9942 -6.32331,1.63095 c 0.11152,1.19582 -0.32788,2.43196 -1.16915,3.2891 -0.84126,0.85714 -2.06897,1.31957 -3.266667,1.23043 -0.329791,-0.0245 -0.656614,-0.0887 -0.97119,-0.19075 l -0.556098,6.75486 -4.25468,0.19271 -1.62192,1.8541 -6.64696,0.92153"
                id="path18"
              />
              <path
                opacity={1}
                fill="none"
                fillOpacity={1}
                stroke="#ffff01"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 97.915335,127.70879 2.711585,5.32089 -1.917957,6.10167 -5.579298,1.91444 -1.251871,1.71102"
                id="path19"
              />
              <path
                opacity={1}
                fill="none"
                fillOpacity={1}
                stroke="#ffff01"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 128.07766,159.33121 0.22548,14.59651 -5.68058,2.61677 -6.33107,0.32696"
                id="path20"
              />
              <path
                opacity={1}
                fill="none"
                fillOpacity={1}
                stroke="#ffff01"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 124.56136,175.45728 0.31349,5.78662 -2.4478,6.68819 -4.14595,6.5736"
                id="path32"
              />
              <path
                opacity={1}
                fill="none"
                fillOpacity={1}
                stroke="#ffff01"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 128.4721,170.25477 4.159,2.90536 -0.88905,5.53023 3.03386,5.61698 0.045,6.22594 -0.93203,1.7399 0.89055,5.40344 -2.80993,4.17945 1.11198,4.03907"
                id="path33"
              />
              <path
                opacity={1}
                fill="none"
                fillOpacity={1}
                stroke="#ffff01"
                strokeWidth={1.165}
                strokeLinecap="round"
                strokeOpacity={1}
                paintOrder="stroke fill markers"
                d="m 99.988311,150.35898 c -0.620329,1.03547 -1.779557,1.7269 -2.985426,1.78068 -1.10013,0.0491 -2.212136,-0.42822 -2.934431,-1.25947 l -7.04397,4.76029 -0.161049,2.65377 -6.059342,-0.72917 -1.813213,1.76713 -1.907837,-0.53955 -4.220009,1.3731 -4.636111,-2.30857 -6.276088,2.24803"
                id="path34"
              />
            </g>
          </g>
        </svg>
      );
  }
}
