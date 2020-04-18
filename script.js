const btnCreate = document.querySelector('.btnCreateVertex');
const btnOutMatrix = document.querySelector('.outMatrixs');
const dataEntry = document.querySelector('.dataEntry');
const td = document.querySelectorAll('td');
const tableA = document.querySelector('.tableOfMatrixA');
const vertexValue = document.querySelector('.vertexInput');
const nameOfMatrixA = document.querySelector('.nameOfMatrixA');
const exBtn1 = document.querySelector('.ex1');
const exBtn2 = document.querySelector('.ex2');

exBtn1.addEventListener('click', fill1);
exBtn2.addEventListener('click', fill2);

btnCreate.addEventListener('click', getValue);
dataEntry.addEventListener('click', deleteBlock);

function deleteBlock(e) {
    if (e.target.tagName === 'BUTTON') {
        e.target.parentElement.remove();
    }
}

function getValue() {
    dataEntry.textContent = ''
    tableA.textContent = ''
    const valueOfInput = vertexValue.value;
    console.log("valueOfInput", valueOfInput);
    if (!valueOfInput) {
        alert('Поле пустое');
        return;
    }
    dataEntry.textContent = '';
    document.querySelector('.nameOfMatrixA').style.display = 'none';
    for (let i = valueOfInput; i > 0; i--) {
        dataEntry.insertAdjacentHTML('afterbegin', 
        `
        <div class="first"> 
            <div>G<sup>+</sup>(${i}) = </div>
            <input type="text" class="inputOfNumbers">
            <button class="btnDeleteVertex">Удалить</button>
        </div>
        `
        )
    }
    btnOutMatrix.style.display = 'block';
    btnOutMatrix.addEventListener('click', outMatrix);
}

function fill1() {
    let valueOfInput = 10;
    document.querySelector('.vertexInput').value = valueOfInput;

    if (!valueOfInput) {
        alert('Поле пустое');
        return;
    }
    dataEntry.textContent = '';
    for (let i = valueOfInput; i > 0; i--) {
        dataEntry.insertAdjacentHTML('afterbegin', 
        `
        <div class="first"> 
            <div>G<sup>+</sup>(${i}) = </div>
            <input type="text" class="inputOfNumbers">
            <button class="btnDeleteVertex">Удалить</button>
        </div>
        `
        )
    }
    btnOutMatrix.style.display = 'block';

    document.querySelectorAll('.inputOfNumbers')[0].value = '2 5 6';
    document.querySelectorAll('.inputOfNumbers')[1].value = '1';
    document.querySelectorAll('.inputOfNumbers')[2].value = '2 4 5';
    document.querySelectorAll('.inputOfNumbers')[3].value = '9';
    document.querySelectorAll('.inputOfNumbers')[4].value = '1 7';
    document.querySelectorAll('.inputOfNumbers')[5].value = '5 8 10';
    document.querySelectorAll('.inputOfNumbers')[6].value = '4';
    document.querySelectorAll('.inputOfNumbers')[7].value = '7 10';
    document.querySelectorAll('.inputOfNumbers')[8].value = '7';
    document.querySelectorAll('.inputOfNumbers')[9].value = '8';

    outMatrix();
}

function fill2() {
    let valueOfInput = 8;
    document.querySelector('.vertexInput').value = valueOfInput;

    if (!valueOfInput) {
        alert('Поле пустое');
        return;
    }
    dataEntry.textContent = '';
    for (let i = valueOfInput; i > 0; i--) {
        dataEntry.insertAdjacentHTML('afterbegin', 
        `
        <div class="first"> 
            <div>G<sup>+</sup>(${i}) = </div>
            <input type="text" class="inputOfNumbers">
            <button class="btnDeleteVertex">Удалить</button>
        </div>
        `
        )
    }
    btnOutMatrix.style.display = 'block';

    document.querySelectorAll('.inputOfNumbers')[0].value = '2 7';
    document.querySelectorAll('.inputOfNumbers')[1].value = '6';
    document.querySelectorAll('.inputOfNumbers')[2].value = '2 6';
    document.querySelectorAll('.inputOfNumbers')[3].value = '3 8';
    document.querySelectorAll('.inputOfNumbers')[4].value = '1 4 8';
    document.querySelectorAll('.inputOfNumbers')[5].value = '7';
    document.querySelectorAll('.inputOfNumbers')[6].value = '';
    document.querySelectorAll('.inputOfNumbers')[7].value = '7';
    
    outMatrix();
}

function outMatrix() {
    let dataOfInputs = Array.from(document.querySelectorAll('.inputOfNumbers'), el => el.value);

    let a = [];

    for (let t = 0; t < dataOfInputs.length; t++) {
        a[t] = dataOfInputs[t].split(' ');
    }

    for (let el in a) {
        a[el] = a[el].map(parseFloat);
        a[el] = a[el].filter(Number);
    }

    let c = [];

    for (let i = 0; i < a.length; i++) {
        c.push([]);
    }

    c = a;

    let Gp = [];

    for (let i = 0; i < a.length; i++) {
        Gp.push([]);
        for (let j = 0; j < a.length; j++) {
            Gp[i][j] = 0;
        }
    }

    for (let i = 0; i < c.length; i++) { // преобразование множества G+ в матрицу смежности
        for (let j = 0; j < c[i].length + 1; j++) {
            for (let k = 0; k < Gp.length + 1; k++) {
                if (c[i][j] == k) {
                    Gp[i][k - 1] = 1;
                }
            }
        }
    }

    console.log('G+:', c);
    console.log('Матрица смежности G+:', Gp);

    let not_null = [];
    for (let i = 0; i < Gp.length; i++) {
        not_null.push([]);
        for (let j = 0; j < Gp[i].length; j++) {
            if (Gp[i][j] > 0) {
                not_null[i].push(j + 1);
            }
        }
    }

    let new_arr = [];
    let tmp_arr = [];
    let finish_arr = [];

    for (let y = 0; y < not_null.length; y++) {
        new_arr.push(not_null[y]);
        for (let x = 0; x < 20; x++) {
            for (let i = 0; i < not_null.length; i++) {
                if (new_arr.flat().indexOf(i + 1) != -1) {
                    for (let j = 0; j < not_null[i].length; j++) {
                        if (new_arr.flat().indexOf(not_null[i][j]) == -1 && not_null[i][j] != y + 1) {
                            tmp_arr.push(not_null[i][j]);
                        }
                    }
                }
            }
            if (tmp_arr.length == 0) {
                break;
            }
            new_arr.push(tmp_arr);
            tmp_arr = [];
        }
        finish_arr.push(new_arr);
        new_arr = [];

    }

    let G = [];
    for (let i = 0; i < not_null.length; i++) {
        G.push([]);
        for (let j = 0; j < not_null.length; j++) {
            G[i][j] = 0;
        }
    }

    for (let i = 0; i < finish_arr.length; i++) {
        value = 1;
        for (let j = 0; j < finish_arr[i].length; j++) {
            for (let k = 0; k < finish_arr[i][j].length; k++) {
                for (let t = 0; t < G.length; t++) {
                    if (finish_arr[i][j][k] == t + 1) {
                        G[i][t] = value;
                    }
                }
            }
            value++;
        }
    }

    for (let i = 0; i < G.length; i++) {
        for (let j = 0; j < G[i].length; j++) {
            if (G[i][j] == 0 && j != i) {
                G[i][j] = 99;
            }
        }
    }
    console.log("Вывод матрицы длин всех путей:", G);

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < dataOfInputs.length + 1; i++) {
        const tr = document.createElement('tr');
        for (let c = 0; c < dataOfInputs.length + 1; c++) {
            if (i === 0) {
                const th = document.createElement('th');
                if (c === 0) {
                    th.textContent = ' '; 
                }
                else {
                    th.textContent = c; 
                }
                tr.appendChild(th);
            }
            else {
                if (c == 0) {
                    const th = document.createElement('th');
                    th.textContent = i;
                    tr.appendChild(th);
                }
                else {
                    const td = document.createElement('td');
                    td.textContent = G[i - 1][c - 1];
                    if (G[i - 1][c - 1] == 99) {
                        td.style.backgroundColor = '#ff4848';
                    } else if (G[i - 1][c - 1] == 0) {
                        td.style.backgroundColor = '#4d84ff';
                    } else {
                        td.style.backgroundColor = '#37ff37';
                    }
                    console.log(i, c);
                    tr.appendChild(td);
                }
            }
        }
        fragment.appendChild(tr);
    }
    nameOfMatrixA.style.display = 'block';
    tableA.textContent = '';
    tableA.appendChild(fragment);
}