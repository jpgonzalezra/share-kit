const logoWithColors = (config: {fgColor: string; bgColor: string}) =>
  `<svg width="25" height="25" viewBox="0 0 710 705" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" rx="200" ry="200" width="710" height="705" fill="${config.bgColor}" />
    <g fill="${config.fgColor}">
      <g id="Leaf" transform="translate(260.000000, -27.000000)">
        <path d="M194.415739,215.192523 C194.258317,268.684765
          150.797287,312 97.2080838,312 C43.6188804,312
          0.157850908,268.684765 0.000429008653,215.192523
          C2.08721929e-14,215.192523 -3.50299401,197.114019
          15.1796407,156.874766 C47.118659,88.0834938
          95.9422811,58.317757 95.9422811,58.317757 C95.9422811,58.317757
          148.877246,91.5588785 180.404192,156.874766 C196.94399,191.141061
          194.416168,215.192523 194.416168,215.192523 Z" id="Combined-Shape" />
      </g>
      <g id="Leaf" transform="translate(357.500000, 576.000000) scale(1, -1)
        translate(-357.500000, -576.000000) translate(260.000000, 420.000000)">
        <path d="M194.415739,215.192523 C194.258317,268.684765
          150.797287,312 97.2080838,312 C43.6188804,312 0.157850908,268.684765
          0.000429008653,215.192523 C2.08721929e-14,215.192523 -3.50299401,197.114019
          15.1796407,156.874766 C47.118659,88.0834938 95.9422811,58.317757
          95.9422811,58.317757 C95.9422811,58.317757 148.877246,91.5588785
          180.404192,156.874766 C196.94399,191.141061 194.416168,215.192523
          194.416168,215.192523 Z" id="Combined-Shape" />
      </g>
      <g id="Leaf" transform="translate(563.000000, 352.500000) scale(1, -1)
        rotate(90.000000) translate(-563.000000, -352.500000)
        translate(465.500000, 196.500000)">
        <path d="M194.415739,215.192523 C194.258317,268.684765 150.797287,312
          97.2080838,312 C43.6188804,312 0.157850908,268.684765
          0.000429008653,215.192523 C2.08721929e-14,215.192523
          -3.50299401,197.114019 15.1796407,156.874766 C47.118659,88.0834938
          95.9422811,58.317757 95.9422811,58.317757 C95.9422811,58.317757
          148.877246,91.5588785 180.404192,156.874766 C196.94399,191.141061
          194.416168,215.192523 194.416168,215.192523 Z" id="Combined-Shape" />
      </g>
      <g id="Leaf" transform="translate(147.000000, 351.500000)
          scale(-1, -1) rotate(90.000000) translate(-147.000000, -351.500000)
          translate(49.500000, 195.500000)">
        <path d="M194.415739,215.192523 C194.258317,268.684765 150.797287,312
          97.2080838,312 C43.6188804,312 0.157850908,268.684765
          0.000429008653,215.192523 C2.08721929e-14,215.192523
          -3.50299401,197.114019 15.1796407,156.874766 C47.118659,88.0834938
          95.9422811,58.317757 95.9422811,58.317757 C95.9422811,58.317757
          148.877246,91.5588785 180.404192,156.874766 C196.94399,191.141061
          194.416168,215.192523 194.416168,215.192523 Z" id="Combined-Shape" />
      </g>
    </g>
  </svg>`

class BloomLogo {
  static getLogo = (config?: {fgColor?: string; bgColor?: string}) => {
    const defaultedConfig = Object.assign(
      {
        fgColor: '#6067f1',
        bgColor: '#fff',
      },
      config || {}
    )

    return `data:image/svg+xml;utf8,${logoWithColors(defaultedConfig)}`
  }
}

export {BloomLogo}
