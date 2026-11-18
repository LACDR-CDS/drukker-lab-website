import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import pages from './pages.json';
import './styles.css';

const projects = [
 ['John Templeton Foundation','templeton.html'],['AiPSC','https://aipsc.eu/'],
 ['Axial Stem Cells','axialsc.html'],['Painless','painless.html'],
 ['Protocol Extractor','https://projectopengenesis.org/'],
 ['VaCS Platform', 'https://vacs-platform.web.app/']
];
function Header(){
 const [mobile,setMobile]=useState(false);
 const [projectOpen,setProjectOpen]=useState(false);
 return <header className="site-header"><div className="nav-inner">
  <a className="brand" href="index.html"><img
  src={`${import.meta.env.BASE_URL}images/leidenlogo.svg`}
  alt="Leiden University"
/><span>Drukker Research Group</span></a>
  <nav className={'site-nav '+(mobile?'is-open':'')} aria-label="Main navigation">
   <a href="index.html">Home</a><a href="team.html">Research Group</a>
   <div className="nav-dropdown"><button aria-expanded={projectOpen} onClick={()=>setProjectOpen(v=>!v)}>Projects <span aria-hidden="true">⌄</span></button>
   <div className={'nav-submenu '+(projectOpen?'is-open':'')}>{projects.map(([label,href])=><a key={href} href={href}>{label}</a>)}</div></div>
   <a className="contact-link" href="contact.html">Contact Us</a>
  </nav><button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={mobile} onClick={()=>setMobile(v=>!v)}>{mobile?'✕':'☰'}</button>
 </div></header>
}
function ContentNode({node}){
 if(typeof node==='string')return node;
 if(!node || !node.tag)return null;
 const {tag,props={},children=[]}=node;
 if(['header','footer','script','style','noscript'].includes(tag))return null;
 const attrs={...props};
if (attrs.src?.startsWith('images/')) {
  attrs.src = import.meta.env.BASE_URL + attrs.src;
}

if (attrs.href?.startsWith('images/')) {
  attrs.href = import.meta.env.BASE_URL + attrs.href;
}
 if(attrs.className==='mobile-nav'||attrs.className==='desktop-nav'||attrs.className==='header-container')return null;
 if(attrs.style && typeof attrs.style==='string')delete attrs.style;
 delete attrs.onclick;delete attrs.onClick;
 if(tag==='img')attrs.loading='lazy';
 if(tag==='form')attrs.onSubmit=(e)=>e.preventDefault();
 if(tag==='input' && !attrs.type)attrs.type='text';
 const safeTag=['div','section','article','main','p','h1','h2','h3','h4','h5','h6','a','img','ul','ol','li','strong','em','i','b','span','br','hr','button','form','input','textarea','label','select','option','table','thead','tbody','tr','th','td','figure','figcaption','iframe'].includes(tag)?tag:'div';
 if(['img','br','hr','input'].includes(safeTag))return React.createElement(safeTag,attrs);
 return React.createElement(safeTag,attrs,...children.map((child,i)=><ContentNode key={i} node={child}/>));
}
function App(){
 const key=window.location.pathname.split('/').pop().replace(/\.html$/,'')||'index';
 const page=pages[key]||pages.index;
 return <><Header/><div className="site-body">{page.filter(n=>typeof n==='object' && n.tag!=='header' && n.tag!=='footer').map((n,i)=><ContentNode node={n} key={i}/>)}</div><footer className="site-footer">© 2026 Drukker Group. All rights reserved.</footer></>;
}
createRoot(document.getElementById('root')).render(<App/>);
