const navItems = [
  ["Home","index.html"],["About","about.html"],["Research","research.html"],["Projects","projects.html"],
  ["Publications","publications.html"],["Patents","patents.html"],["Collaboration","collaboration.html"],
  ["Facilities","facilities.html"],["Updates","updates.html"]
];
const path = location.pathname.split("/").pop() || "index.html";
const header = document.getElementById("site-header");
if (header) {
  header.innerHTML = `<header class="site-header"><div class="nav-wrap">
    <a class="brand" href="index.html"><img src="assets/hp-logo.png" alt="HP logo"><span>Prof. Hirendrasinh Padhiyar<small>Environmental Engineering · Research</small></span></a>
    <button class="nav-toggle" aria-label="Open navigation" aria-expanded="false">☰</button>
    <nav class="nav-links" aria-label="Main navigation">${navItems.map(([label,url])=>`<a href="${url}" class="${path===url?'active':''}">${label}</a>`).join("")}</nav>
  </div></header>`;
  const toggle = header.querySelector(".nav-toggle");
  const nav = header.querySelector(".nav-links");
  toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));toggle.textContent=open?"×":"☰";});
}
const footer = document.getElementById("site-footer");
if (footer) footer.innerHTML = `<footer class="site-footer"><div class="wrap"><div class="footer-grid">
  <div><div class="footer-brand"><img src="assets/hp-logo.png" alt=""><b>Prof. Hirendrasinh Padhiyar</b></div><p>Environmental Engineering · Research · Innovation<br>Marwadi University, Rajkot, Gujarat, India</p><p>Bridging environmental science, engineering innovation and circular economy.</p></div>
  <div><h4>Explore</h4><div class="footer-links"><a href="research.html">Research themes</a><a href="projects.html">Projects</a><a href="publications.html">Publications</a><a href="patents.html">Patent portfolio</a><a href="facilities.html">Research facilities</a></div></div>
  <div><h4>Connect</h4><div class="footer-links"><a href="collaboration.html">Research collaboration</a><a href="https://scholar.google.com/citations?user=3JB1XCEAAAAJ" target="_blank" rel="noopener">Google Scholar ↗</a><a href="https://www.researchgate.net/profile/Hirendrasinh-Padhiyar" target="_blank" rel="noopener">ResearchGate ↗</a><a href="https://www.linkedin.com/in/hirendrasinh" target="_blank" rel="noopener">LinkedIn ↗</a><a href="mailto:hirendrasinh.researsch@gmail.com">Email ↗</a></div></div>
</div><div class="copyright"><span>© <span id="year"></span> Prof. Hirendrasinh Padhiyar. Academic portfolio.</span><span><a href="academic-cv-public.pdf" download>Download public academic CV ↓</a> · <a href="README.md">Website information</a></span></div></div></footer>`;
const year = document.getElementById("year"); if(year) year.textContent = new Date().getFullYear();

// Gentle scroll reveal.
const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}}),{threshold:.08});
document.querySelectorAll(".feature-card,.project-card,.paper-highlight,.timeline-item,.research-row,.blog-card").forEach(el=>{el.classList.add("reveal");observer.observe(el)});

// Publication library.
if (window.PORTFOLIO_DATA && document.getElementById("publication-list")) {
  const pubs=PORTFOLIO_DATA.publications, list=document.getElementById("publication-list"), search=document.getElementById("pub-search"), type=document.getElementById("pub-type"), yearSelect=document.getElementById("pub-year");
  [...new Set(pubs.map(p=>p.year))].sort((a,b)=>b-a).forEach(y=>yearSelect.add(new Option(y,y)));
  function renderPubs(){
    const q=search.value.toLowerCase(), t=type.value, y=yearSelect.value;
    const rows=pubs.filter(p=>(t==="all"||p.type===t)&&(y==="all"||String(p.year)===y)&&[p.title,p.authors,p.journal,p.doi].join(" ").toLowerCase().includes(q));
    list.innerHTML=rows.length?rows.map(p=>`<article class="publication-item"><span class="tag">${p.year} · ${p.type}</span><h3>${p.title}</h3><p>${p.authors}</p><p><i>${p.journal}</i></p><a class="doi" href="https://doi.org/${p.doi}" target="_blank" rel="noopener">DOI: ${p.doi} ↗</a></article>`).join(""):`<div class="empty-state">No publications match these filters.</div>`;
  }
  [search,type,yearSelect].forEach(el=>el.addEventListener("input",renderPubs)); renderPubs();
  const bookList=document.getElementById("book-list");
  if(bookList) bookList.innerHTML=PORTFOLIO_DATA.books.map(b=>`<article class="publication-item"><span class="tag">${b[0]} · Book chapter</span><h3>${b[1]}</h3><p>${b[2]}</p><a class="doi" href="https://doi.org/${b[3]}" target="_blank" rel="noopener">DOI: ${b[3]} ↗</a></article>`).join("");
  const confList=document.getElementById("conference-list");
  if(confList) confList.innerHTML=PORTFOLIO_DATA.conferences.map(c=>`<li>${c}</li>`).join("");
}
// Patent search.
if (window.PORTFOLIO_DATA && document.getElementById("patent-list")) {
  const input=document.getElementById("patent-search"), body=document.getElementById("patent-list"), count=document.getElementById("patent-count");
  function renderPatents(){const q=input.value.toLowerCase();const rows=PORTFOLIO_DATA.patents.filter(p=>p.join(" ").toLowerCase().includes(q));body.innerHTML=rows.map((p,i)=>`<tr><td>${PORTFOLIO_DATA.patents.indexOf(p)+1}</td><td>${p[0]}</td><td><b>${p[1]}</b></td><td>${p[2]}</td></tr>`).join("");count.textContent=`${rows.length} of ${PORTFOLIO_DATA.patents.length} applications`;}
  input.addEventListener("input",renderPatents);renderPatents();
}
