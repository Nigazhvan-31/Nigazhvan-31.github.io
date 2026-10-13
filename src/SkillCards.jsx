import { useState } from 'react';
import './skill-cards.css';

// Fixed artwork coordinates preserve the reference card's proportions at every size.
// Each terminal is a real skill; branch paths share the same continuous trunk.
const branches = [
  'M202 809 L253 790 Q300 781 300 747 V367 L266 325 L247 268 V115',
  'M409 809 L355 792 Q310 782 310 747 V369 L348 318 L365 258 V111',
  'M145 797 H198 Q290 797 290 750 V475 Q290 447 262 420 L198 360 L173 302 L116 276',
  'M459 798 H405 Q320 798 320 751 V478 Q320 448 348 418 L411 357 L439 295 L491 281',
  'M124 780 H204 Q282 780 282 744 V532 Q282 511 257 498 L202 472 L146 431 L106 427',
  'M482 780 H411 Q328 780 328 744 V531 Q328 508 353 494 L408 467 L465 425 L514 419',
  'M182 763 H223 Q273 763 273 725 V569 Q273 531 239 525 L209 539 L176 528 L151 549 L111 550',
  'M436 763 H389 Q337 763 337 725 V568 Q337 533 369 525 L396 541 L427 525 L457 548 L500 552',
  'M291 826 L305 790 V326 L304 82',
  'M300 494 L269 454 L237 425 L217 400 L188 385 L170 358',
  'M310 494 L347 453 L378 433 L401 404 L437 382',
  'M300 461 L276 415 L265 380 L233 359 L223 326',
  'M310 461 L333 415 L359 393 L370 363 L383 350',
  'M282 539 L248 507 L221 490 L186 488 L162 481',
  'M328 539 L366 503 L398 478 L442 476 L472 468',
];

// [x, y, connected twig]. Domains are grouped on branches, never in radial clusters.
const terminals = [
  [
    [304,82,'M304 326 V82'], [212,112,'M266 325 L231 291 L211 226 V166 L212 112'],
    [247,115,'M247 268 V115'], [227,143,'M247 268 L227 229 V143'],
    [229,210,'M247 268 L240 246 L229 232 V210'], [248,245,'M266 325 L257 296 L248 270 V245'],
  ],
  [
    [365,111,'M365 258 V111'], [392,114,'M348 318 L374 289 L392 240 V114'],
    [366,210,'M348 318 L357 282 L366 256 V210'], [387,194,'M374 289 L386 262 L387 194'],
    [490,236,'M411 357 L431 300 L461 283 L490 236'],
    [474,266,'M411 357 L429 319 L451 299 L474 266'], [447,257,'M411 357 L418 303 L447 257'],
  ],
  [
    [112,247,'M173 302 L151 277 L133 263 L112 247'],
    [137,272,'M173 302 L149 290 L137 272'], [89,292,'M198 360 L163 332 L136 319 L111 318 L89 292'],
    [92,329,'M262 420 L226 400 L202 389 L162 369 L116 352 L92 329'],
  ],
  [
    [514,315,'M411 357 L460 348 L482 344 L514 315'],
    [492,345,'M348 418 L381 408 L408 397 L459 367 L492 345'], [550,357,'M348 418 L381 408 L408 397 L467 388 L502 368 L550 357'],
    [530,395,'M465 425 L493 411 L530 395'], [512,374,'M465 425 L477 390 L512 374'],
  ],
  [
    [86,403,'M146 431 L126 410 L106 410 L86 403'],
    [66,435,'M202 472 L160 468 L131 442 L103 442 L66 435'],
    [110,454,'M202 472 L169 470 L149 455 L110 454'],
    [144,374,'M262 420 L219 407 L194 382 L144 374'],
    [234,355,'M262 420 L250 380 L234 355'],
  ],
  [
    [532,413,'M465 425 L502 425 L532 413'],
    [490,501,'M408 467 L438 482 L464 482 L490 501'],
    [528,522,'M427 525 L452 513 L479 513 L498 522 H528'],
    [440,536,'M396 541 L415 549 L440 536'],
    [454,561,'M396 541 L414 563 L434 563 L454 561'],
    [486,568,'M457 548 L472 553 L486 568'],
  ],
  [
    [115,514,'M209 539 L181 524 L153 514 H115'],
    [81,542,'M151 549 L130 541 L81 542'],
    [166,553,'M239 525 L211 549 L184 552 L166 553'],
    [127,587,'M273 569 Q260 538 239 546 L207 563 L186 562 L162 575 L127 587'],
  ],
  [
    [187,801,'M290 750 Q290 787 258 789 L221 801 H187'],
    [236,844,'M300 747 V779 L285 807 L263 823 L236 844'],
    [493,795,'M320 751 Q320 788 362 788 H445 L467 795 H493'],
    [333,810,'M310 747 V782 L319 800 L333 810'],
  ],
  [
    [180,886,'M282 744 V765 L259 795 L217 808 L199 827 L180 841 V886'],
    [308,848,'M305 790 V822 L308 848'],
    [220,927,'M300 747 V780 L278 816 L278 841 L263 859 V896 L220 927'],
    [345,891,'M310 747 V782 L327 803 L345 830 V891'],
    [281,934,'M305 790 L294 812 L294 866 L281 891 V934'],
  ],
];

const fineTraces = [
  'M277 101 V233 L263 252 L269 286', 'M289 116 V226 L267 245',
  'M329 109 V222 L346 246', 'M340 132 V217 L354 234',
  'M193 183 V223 L219 249', 'M157 181 V216 L183 233 V254',
  'M176 161 V210 L195 224 V252', 'M407 148 L419 134',
  'M407 148 V222 L396 239', 'M430 173 V211 L410 235 L396 242',
  'M446 167 L432 181 V206', 'M442 221 L462 203',
  'M125 300 L142 304 L150 296 L181 296 L196 317',
  'M115 336 L128 350 L148 354', 'M102 348 L116 365 L148 380',
  'M151 345 L170 352 L180 350 L195 363',
  'M446 293 L488 294 L499 283', 'M452 320 L478 316 L493 298',
  'M474 338 L493 335 L511 302', 'M503 350 L526 339 L536 319',
  'M510 366 L540 348', 'M407 443 L443 427 L464 434 L482 431',
  'M400 426 L424 408 L454 404 L468 409 L480 399',
  'M196 443 L173 414 L146 409', 'M172 409 L154 401 L131 403',
  'M112 417 L125 425 L132 443', 'M126 477 L156 474 L171 483 L185 483',
  'M181 504 L153 492 L147 478', 'M172 545 L195 530 L206 533',
  'M391 558 L412 583 L435 586 L444 600',
  'M431 534 L452 530 L474 538 L492 537',
  'M466 554 L468 575 L480 584',
  'M272 699 L250 716 L231 721 L209 734 H165 L154 743 H128 L117 754 V810',
  'M274 729 L252 743 L203 748 L191 756 H124 L104 776 V906 L124 926 V987',
  'M332 709 L347 722 H369 L376 733 V745 H445 Q463 745 463 762 V795',
  'M339 732 L361 751 L389 755 H519 L528 782 V978',
  'M44 760 H95 L114 748 H172', 'M17 817 H135 L153 802 H209',
  'M24 868 H107 L125 851 H212 L227 838 H252',
  'M378 817 H587 V970', 'M353 855 H549 V987',
  'M45 785 V971', 'M67 820 V987', 'M132 779 V947',
  'M155 851 V990', 'M182 906 V988', 'M220 948 V985',
  'M308 872 V896 L319 909 V988', 'M345 910 V988',
  'M369 994 V869 L382 850 H443 L465 874 V992',
  'M395 994 V859 L411 842 H444 L472 867 V992',
  'M506 817 L518 852 V989', 'M560 817 V974',
];

function CardFrame({ front = false }) {
  return <g aria-hidden="true">
    <rect className="tva-stock" x="5" y="5" width="610" height="990" rx="30" />
    {!front && <rect className="tva-ink" x="18" y="18" width="584" height="964" rx="23" />}
    <rect className="tva-edge" x="7" y="7" width="606" height="986" rx="28" />
  </g>;
}

function IdentityCard({ portrait }) {
  return <figure className="tva-card tva-identity reveal-item" aria-label="Nigazhvan's TVA-inspired engineering ID card">
    <svg viewBox="0 0 620 1000" className="tva-art" role="img" aria-labelledby="identity-title">
      <title id="identity-title">Nigazhvan G, AI engineer. A blue TVA-inspired identity card with his cropped suit portrait.</title>
      <CardFrame front />
      <g className="tva-ink" aria-hidden="true">
        <path d="M17 5 H84 V993 H17Z M527 5 H586 V993 H527Z M63 108 H538 V171 H63Z" />
      </g>
      <path className="tva-stock" d="M113 184 H498 Q527 184 527 214 V248 Q527 272 551 293 L574 315 V900 H36 V315 L59 289 Q84 267 84 242 V214 Q84 184 113 184Z" aria-hidden="true" />
      <path className="tva-ink" d="M83 993 V490 Q83 432 148 432 H469 Q527 432 527 490 V834 Q527 864 551 884 L574 902 V993 H471 V917 H352 V993 H323 V890 H290 V993 H258 V917 H137 V993 H36 V902 L60 883 Q83 865 83 834Z" aria-hidden="true" />
      <g className="tva-front-traces" aria-hidden="true">
        <path d="M23 4 V994 M42 4 V994 M558 4 V994 M581 4 V994" />
        <path d="M43 76 L62 93 V148 L43 166 M558 76 L538 92 V148 L558 166" />
        <path d="M63 122 H113 L134 141 H153 M63 134 H105 M459 141 H477 L498 122 H538 M505 136 H538" />
        <path d="M63 162 H538 M63 167 H538" />
        <path d="M138 893 H196 L215 905 H258 M352 905 H391 L408 893 H471" />
      </g>
      <text className="tva-serial" x="306" y="150" textAnchor="middle" textLength="296" lengthAdjust="spacingAndGlyphs">NIGAZHVAN G / AI ENGINEER</text>
      <g className="tva-ink" aria-hidden="true">
        <path d="M116 222 H169 L116 290Z M169 222 H228 V394 H169Z" />
        <path d="M230 222 H317 L371 288 L316 394Z" />
        <path d="M419 222 L500 394 H341Z" />
        <path d="M341 223 H400 L312 393 H372" fill="none" stroke="currentColor" strokeWidth="6" />
      </g>
      <rect className="tva-photo-keyline" x="134" y="451" width="337" height="430" rx="7" />
      <g className="tva-stock" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => <path key={index} d={`M103 ${540 + index * 23} h18 l-18 16Z M493 ${540 + index * 23} h-18 l18 16Z`} />)}
      </g>
      <rect className="tva-edge" x="7" y="7" width="606" height="986" rx="28" />
    </svg>
    <div className="tva-portrait"><img src={portrait} alt="Nigazhvan in a navy suit, using his supplied cropped portrait" width="1398" height="1318" /></div>
  </figure>;
}

function CircuitTree({ domains, selected, onSelect }) {
  const [preview, setPreview] = useState(null);
  return <div className="tva-card tva-tree reveal-item">
    <svg className="tva-art" viewBox="0 0 620 1000" aria-labelledby="circuit-title circuit-help">
      <title id="circuit-title">Skills circuit tree</title>
      <desc id="circuit-help">Each dot is a skill. Select a dot, use the arrow keys to move between skills, or use the skill selector below.</desc>
      <CardFrame />
      <g className="tva-fine-trace" aria-hidden="true">
        <path d="M113 26 H59 Q36 26 36 49 V158 M151 26 H167 L36 216 V665 L87 718 H36 V693 L62 718" />
        <path d="M173 28 H446 L584 202 V45 Q584 27 566 27 H503 M177 21 L31 194 M447 21 L586 186" />
        <path d="M181 30 L41 221 V672 L79 709 M450 31 L582 207 V651 L491 741 H582 V978" />
        <path d="M559 50 V102 L544 113 V87 L526 77 M559 50 L583 65 M526 77 L504 58" />
        <path d="M540 729 L562 707 V696 L579 687 V726 M545 708 V697 L563 683" />
        {[ [95,53],[76,78],[505,39],[526,64],[544,87],[560,50],[583,65],[543,112],[574,132],[501,739],[542,728],[562,707],[579,727],[565,684] ].map(([x,y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="3" />)}
        {fineTraces.map((path, index) => <path d={path} key={index} />)}
      </g>
      <g className="tva-tree-limbs" aria-hidden="true">{branches.map((path, index) => <path key={index} d={path} />)}</g>
      <g className="tva-twigs" aria-hidden="true">{terminals.flat().map(([, , path], index) => <path key={index} d={path} />)}</g>
      {domains.flatMap((domain, domainIndex) => domain.tools.map(([name], index) => {
        const [x, y] = terminals[domainIndex][index];
        const id = `${domainIndex}-${index}`;
        const active = preview === id || selected === id;
        return <g key={id} role="button" tabIndex={selected === id ? 0 : -1}
          aria-label={`${name}, ${domain.title}`} aria-pressed={selected === id}
          className={`tva-terminal${active ? ' is-active' : ''}`} data-skill-id={id}
          onMouseEnter={() => setPreview(id)} onMouseLeave={() => setPreview(null)}
          onFocus={() => setPreview(id)} onBlur={() => setPreview(null)}
          onClick={() => onSelect(id)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelect(id); }
            if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
              event.preventDefault();
              const nodes = [...event.currentTarget.ownerSVGElement.querySelectorAll('.tva-terminal')];
              const current = nodes.indexOf(event.currentTarget);
              const next = event.key === 'Home' ? 0 : event.key === 'End' ? nodes.length - 1 : (current + (['ArrowLeft', 'ArrowUp'].includes(event.key) ? -1 : 1) + nodes.length) % nodes.length;
              onSelect(nodes[next].dataset.skillId); nodes[next].focus();
            }
          }}>
          <title>{name} · {domain.title}</title>
          <circle className="tva-node-target" cx={x} cy={y} r="16" />
          <circle className="tva-node-ring" cx={x} cy={y} r="14" />
          <circle className="tva-node" cx={x} cy={y} r={index % 3 === 0 ? 9 : index % 3 === 1 ? 7 : 5.5} />
        </g>;
      }))}
      {preview && (() => {
        const [domainIndex, index] = preview.split('-').map(Number);
        const [x, y] = terminals[domainIndex][index];
        const name = domains[domainIndex].tools[index][0];
        const width = Math.max(110, name.length * 7 + 24);
        const left = Math.min(592 - width, Math.max(28, x - width / 2));
        return <g className="tva-node-tooltip" aria-hidden="true" pointerEvents="none">
          <rect x={left} y={y + 20} width={width} height="31" rx="3" />
          <text x={left + width / 2} y={y + 40} textAnchor="middle">{name}</text>
        </g>;
      })()}
    </svg>
  </div>;
}

export default function SkillCards({ domains, portrait }) {
  const [selected, setSelected] = useState('0-0');
  const [domainIndex, toolIndex] = selected.split('-').map(Number);
  const domain = domains[domainIndex];
  return <div className="tva-skills">
    <div className="tva-card-pair">
      <IdentityCard portrait={portrait} />
      <CircuitTree domains={domains} selected={selected} onSelect={setSelected} />
    </div>
    <div className="tva-skill-explorer">
      <div className="tva-skill-picker">
        <label htmlFor="skill-selection">Select a tree node or choose a skill</label>
        <select id="skill-selection" value={selected} onChange={(event) => setSelected(event.target.value)}>
          {domains.map((group, groupIndex) => <optgroup key={group.title} label={group.title}>
            {group.tools.map(([name], index) => <option key={name} value={`${groupIndex}-${index}`}>{name}</option>)}
          </optgroup>)}
        </select>
      </div>
      <div className="tva-skill-detail" aria-live="polite" aria-atomic="true">
        <span>{domain.title}</span><h3>{domain.tools[toolIndex][0]}</h3><p>{domain.copy}</p>
      </div>
    </div>
  </div>;
}
