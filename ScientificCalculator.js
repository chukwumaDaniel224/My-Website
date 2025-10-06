(function(){
  const display = document.getElementById('display');
  const pad = document.getElementById('pad');
  const equalsBtn = document.getElementById('equals');
  const backBtn = document.getElementById('back');
  const clearBtn = document.getElementById('clear');

  let expr = "";
  let justEvaluated = false;

  function updateDisplay(){ display.value = expr || "0"; }

  function isOperator(ch){
    return ['+','-','×','÷','^','%','*','/','−'].includes(ch);
  }

  
  function safeAppend(token){
    if (!token) return;

    if (justEvaluated){
      expr = "";
      justEvaluated = false;
    }
    const last = expr.slice(-1);


    if (/^[0-9.]$/.test(token)){
      if (token === '.'){
        const m = expr.match(/([0-9]*\.?[0-9]*)$/);
        const lastNum = m ? m[0] : "";
        if (lastNum.includes('.')) return;
      }
      expr += token; updateDisplay(); return;
    }


    if (token === '('){
      if (expr && /[0-9\)\πe]$/.test(expr)) expr += '×';
      expr += '('; updateDisplay(); return;
    }
    if (token === ')'){ expr += ')'; updateDisplay(); return; }

 
    if (token === 'sin(' || token === 'cos(' || token === 'tan(' || token === '√('){
      if (expr && /[0-9\)\πe]$/.test(expr)) expr += '×';
      expr += token; updateDisplay(); return;
    }


    if (token === 'π' || token === 'e'){
      if (expr && /[0-9\)\πe]$/.test(expr)) expr += '×';
      expr += token; updateDisplay(); return;
    }


    if (token === '%'){
      if (!expr || !(/[0-9\)]$/.test(expr))) return;
      expr += '%'; updateDisplay(); return;
    }


    if (token === '×' || token === '÷' || token === '+' || token === '-' || token === '^'){
      if (!expr) return;
      if (isOperator(last) || last === '(') return;
      expr += token; updateDisplay(); return;
    }


    if (token === '^2' || token === '^3'){

      if (!expr || !(/[0-9\)]$/.test(expr))) return;
      expr += (token === '^2') ? '^2' : '^3';
      updateDisplay(); return;
    }


    expr += token; updateDisplay();
  }

  function backspace(){
    if (!expr) return;
    expr = expr.slice(0, -1);
    updateDisplay();
  }
  function clearAll(){ expr = ""; updateDisplay(); justEvaluated=false; }


  function buildSafeExpression(s){
    if (!s) return "0";
    let safe = s;

    const opens = (safe.match(/\(/g)||[]).length;
    const closes = (safe.match(/\)/g)||[]).length;
    if (opens > closes) safe += ')'.repeat(opens - closes);


    safe = safe.replace(/×/g, '*');
    safe = safe.replace(/÷/g, '/');


    safe = safe.replace(/π/g, 'Math.PI');

    safe = safe.replace(/\be\b/g, 'Math.E');


    safe = safe.replace(/sin\(([^)]+)\)/g, 'Math.sin(($1)*Math.PI/180)');
    safe = safe.replace(/cos\(([^)]+)\)/g, 'Math.cos(($1)*Math.PI/180)');
    safe = safe.replace(/tan\(([^)]+)\)/g, 'Math.tan(($1)*Math.PI/180)');


  
    safe = safe.replace(/√\(([^)]+)\)/g, 'Math.sqrt($1)');



    safe = safe.replace(/\^/g, '**');


    safe = safe.replace(/\)\%/g, ')/100');
    safe = safe.replace(/([0-9]*\.?[0-9]+)\%/g, '($1/100)');

    return safe;
  }

  function evaluate(){
    if (!expr) return;
    const last = expr.slice(-1);
 
    if (isOperator(last) && last !== '%' ) { expr = "Error"; updateDisplay(); justEvaluated = true; return; }
    if (last === '(') { expr = "Error"; updateDisplay(); justEvaluated = true; return; }

    try{
      const js = buildSafeExpression(expr);
      const res = eval(js); 
      
      if (!isFinite(res) || Number.isNaN(res)){ expr = "Error"; updateDisplay(); justEvaluated=true; return; }
      const formatted = Number.parseFloat(res.toPrecision(12)).toString();
      expr = formatted;
      updateDisplay();
      justEvaluated = true;
      
    }catch(e){
      expr = "Error"; updateDisplay(); justEvaluated = true;
    }
  }


  pad.addEventListener('click', (e)=>{
    const btn = e.target.closest('button');
    if (!btn) return;
    if (btn.id === 'equals'){ evaluate(); return; }
    if (btn.id === 'back'){ backspace(); return; }
    if (btn.id === 'clear'){ clearAll(); return; }
    const val = btn.dataset.val;
    safeAppend(val);
  });

 
  window.addEventListener('keydown', (e)=>{
    const k = e.key;
    if (k === 'Enter'){ e.preventDefault(); evaluate(); return; }
    if (k === 'Backspace'){ e.preventDefault(); backspace(); return; }
    if (k === 'Delete'){ e.preventDefault(); clearAll(); return; }
    if (/^[0-9]$/.test(k)){ e.preventDefault(); safeAppend(k); return; }
    if (k === '.') { e.preventDefault(); safeAppend('.'); return; }
    if (k === '+'){ e.preventDefault(); safeAppend('+'); return; }
    if (k === '-') { e.preventDefault(); safeAppend('-'); return; }
    if (k === '*') { e.preventDefault(); safeAppend('×'); return; } // show ×
    if (k === '/') { e.preventDefault(); safeAppend('÷'); return; } // show ÷
    if (k === '^') { e.preventDefault(); safeAppend('^'); return; }
    if (k === '%') { e.preventDefault(); safeAppend('%'); return; }
    if (k === '(' || k === ')'){ e.preventDefault(); safeAppend(k); return; }

   
    if (k.toLowerCase()==='s'){ e.preventDefault(); safeAppend('sin('); return; }
    if (k.toLowerCase()==='o'){ e.preventDefault(); safeAppend('cos('); return; }
    if (k.toLowerCase()==='t'){ e.preventDefault(); safeAppend('tan('); return; }
    if (k.toLowerCase()==='r'){ e.preventDefault(); safeAppend('√('); return; }
    if (k.toLowerCase()==='p'){ e.preventDefault(); safeAppend('π'); return; }
    if (k === 'e'){ e.preventDefault(); safeAppend('e'); return; }
  });

 
  updateDisplay();
})();