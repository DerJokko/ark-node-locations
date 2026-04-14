let data = [];

function getSectionInfo(section, sectionIndex){
  let total = 0, checked = 0;
  const elements = section.elements || section.runes || [];
  if(elements.forEach){
    elements.forEach((el, elIndex) => {
      const type = el.type || (el.coord || el.lat ? 'coord' : 'note');
      if(type === 'coord'){
        total++;
        if(localStorage.getItem(`${sectionIndex}_${elIndex}`) === 'true'){
          checked++;
        }
      }
    });
  }
  return { total, checked };
}

function render(){
  let total = 0, checked = 0;
  const container = document.getElementById('content');
  container.innerHTML = '';

  data.forEach((section, sectionIndex) => {
    const sectionInfo = getSectionInfo(section, sectionIndex);
    total += sectionInfo.total;
    checked += sectionInfo.checked;

    const div = document.createElement('div');
    div.className = 'section';

    const sectionTitle = section.title || section.section;
    let html = '<div class="section-header">';
    html += `<h2>${sectionTitle}${sectionInfo.total > 0 ? ` (${sectionInfo.total} runes)` : ''}</h2>`;
    if(sectionInfo.total > 0){
      const buttonLabel = sectionInfo.checked === sectionInfo.total ? 'Uncheck section' : 'Check section';
      html += `<button class="section-toggle-button" onclick="toggleSection(${sectionIndex})">${buttonLabel}</button>`;
    }
    html += `</div>`;

    if(section.description){
      html += `<div class="section-desc">${section.description}</div>`;
    }

    const elements = section.elements || section.runes || [];
    if(elements.forEach){
      elements.forEach((el, elIndex) => {
        const id = `${sectionIndex}_${elIndex}`;
        const type = el.type || (el.coord || el.lat ? 'coord' : 'note');

        if(type === 'entrance'){
          const coord = el.lat && el.lon ? `${el.lat} / ${el.lon} — ` : '';
          const title = el.name || el.title || '';
          html += `<div class="element entrance">${coord}${title}</div>`;
          return;
        }

        if(type === 'description'){
          html += `<div class="section-desc description">${el.text}</div>`;
          return;
        }

        if(type === 'note'){
          html += `<div class="element note">${el.text}</div>`;
          return;
        }

        if(type === 'picture' || type === 'hint' || type === 'right_picture' || type === 'left_picture'){
          const src = el.src || el.img || el.link;
          if(src){
            html += `<div class="element picture ${type}"><a href="${src}" target="_blank" rel="noopener noreferrer"><img src="${src}" alt="Section image"></a></div>`;
          }
          return;
        }

        if(type === 'coord'){
          const isChecked = localStorage.getItem(id) === 'true';
          const coordText = el.coord || `${el.lat || ''} / ${el.lon || ''}`;

          html += `<div class="element coord"><label><input type="checkbox" ${isChecked ? 'checked' : ''} onchange="toggle('${id}')"><span class="coord-title">${coordText}</span></label>`;
          if(el.desc){
            html += `<div class="coord-desc">${el.desc}</div>`;
          }
          if(el.img){
            html += `<div class="element picture"><a href="${el.img}" target="_blank" rel="noopener noreferrer"><img src="${el.img}" alt="Rune picture"></a></div>`;
          }
          html += `</div>`;
          return;
        }

        if(typeof el === 'object' && (el.coord || el.lat)){
          const isChecked = localStorage.getItem(id) === 'true';
          const coordText = el.coord || `${el.lat || ''} / ${el.lon || ''}`;
          html += `<div class="element coord"><label><input type="checkbox" ${isChecked ? 'checked' : ''} onchange="toggle('${id}')"><span class="coord-title">${coordText}</span></label>`;
          if(el.desc){
            html += `<div class="coord-desc">${el.desc}</div>`;
          }
          html += `</div>`;
          return;
        }
      });
    }

    div.innerHTML = html;
    container.appendChild(div);
  });

  document.getElementById('progress').innerText = `Progress: ${checked} / ${total}`;
}

function toggle(id){
  const val = localStorage.getItem(id) === 'true';
  localStorage.setItem(id, !val);
  render();
}

function openExportModal(){
  const timestamp = new Date().toISOString().slice(0,19).replace(/[-:]/g, '').replace('T', '_');
  const defaultName = `fjordur_save_${timestamp}`;
  const modal = document.getElementById('exportModal');
  const fileNameInput = document.getElementById('exportFileName');

  fileNameInput.value = defaultName;
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  fileNameInput.focus();
}

function closeExportModal(){
  const modal = document.getElementById('exportModal');
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
}

function exportJSON(){
  const fileNameInput = document.getElementById('exportFileName');
  const rawName = fileNameInput.value.trim();

  if(!rawName){
    fileNameInput.focus();
    return;
  }

  const fileName = `${rawName}.json`;
  let obj = {};
  for(let i = 0; i < localStorage.length; i++){
    const key = localStorage.key(i);
    obj[key] = localStorage.getItem(key);
  }

  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = fileName;
  a.click();
  closeExportModal();
}

function importJSON(e){
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = function(ev){
    const obj = JSON.parse(ev.target.result);
    Object.keys(obj).forEach(k => {
      localStorage.setItem(k, obj[k]);
    });
    render();
  };

  reader.readAsText(file);
}

function setAll(checked){
  data.forEach((section, sectionIndex) => {
    const elements = section.elements || section.runes || [];
    if(elements.forEach){
      elements.forEach((el, elIndex) => {
        const type = el.type || (el.coord || el.lat ? 'coord' : 'note');
        if(type === 'coord'){
          const id = `${sectionIndex}_${elIndex}`;
          if(checked){
            localStorage.setItem(id, 'true');
          } else {
            localStorage.removeItem(id);
          }
        }
      });
    }
  });
  render();
}

function checkAll(){
  setAll(true);
}

function uncheckAll(){
  setAll(false);
}

function toggleSection(sectionIndex){
  const section = data[sectionIndex];
  if(!section) return;

  const elements = section.elements || section.runes || [];
  let sectionTotal = 0;
  let sectionChecked = 0;

  if(elements.forEach){
    elements.forEach((el, elIndex) => {
      const type = el.type || (el.coord || el.lat ? 'coord' : 'note');
      if(type === 'coord'){
        sectionTotal++;
        if(localStorage.getItem(`${sectionIndex}_${elIndex}`) === 'true'){
          sectionChecked++;
        }
      }
    });
  }

  const check = sectionTotal > 0 && sectionChecked !== sectionTotal;
  if(elements.forEach){
    elements.forEach((el, elIndex) => {
      const type = el.type || (el.coord || el.lat ? 'coord' : 'note');
      if(type === 'coord'){
        const id = `${sectionIndex}_${elIndex}`;
        if(check){
          localStorage.setItem(id, 'true');
        } else {
          localStorage.removeItem(id);
        }
      }
    });
  }

  render();
}

function bindControls(){
  const exportButton = document.getElementById('exportButton');
  const importFile = document.getElementById('importFile');
  const checkAllButton = document.getElementById('checkAllButton');
  const uncheckAllButton = document.getElementById('uncheckAllButton');

  if(exportButton){
    exportButton.addEventListener('click', openExportModal);
  }

  const exportConfirmButton = document.getElementById('exportConfirmButton');
  const exportCancelButton = document.getElementById('exportCancelButton');

  if(exportConfirmButton){
    exportConfirmButton.addEventListener('click', exportJSON);
  }

  if(exportCancelButton){
    exportCancelButton.addEventListener('click', closeExportModal);
  }

  if(importFile){
    importFile.addEventListener('change', importJSON);
  }

  if(checkAllButton){
    checkAllButton.addEventListener('click', checkAll);
  }

  if(uncheckAllButton){
    uncheckAllButton.addEventListener('click', uncheckAll);
  }
}

fetch('assets/json/fjordur-runes.json')
  .then(r => { if(!r.ok) throw new Error('Failed to fetch assets/json/fjordur-runes.json'); return r.json(); })
  .then(j => { data = j; render(); })
  .catch(err => { console.error('Failed to load assets/json/fjordur-runes.json', err); document.getElementById('content').innerText = 'Failed to load assets/json/fjordur-runes.json — check file presence.'; });

bindControls();
