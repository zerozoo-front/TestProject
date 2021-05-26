let comments = [];
let commentsCnt = 0;
const getComment = (event) => {
  event.preventDefault();
  comments.push(document.querySelector('#comment').value);
  document.querySelector('#comment').value = '';
  setComment(comments);
  makeDeleteBtn();
  makeModifyBtn(comments);
};

const setComment = (comments) => {
  const list = document.createElement('li');
  list.innerText = comments[comments.length - 1];
  list.id = ++commentsCnt;
  document.querySelector('#showList').appendChild(list);
};

const makeDeleteBtn = () => {
  const id = commentsCnt;
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = 'X';
  deleteBtn.onclick = () => {
    if (window.confirm('댓글을 지우시겠습니까?')) {
      document.getElementById(id).remove();
    }
  };
  document.getElementById(id).appendChild(deleteBtn);
};

const makeModifyBtn = (comments) => {
  const id = commentsCnt;
  const modifyBtn = document.createElement('button');
  modifyBtn.id = commentsCnt + 'modifyBtn';
  modifyBtn.innerHTML = '수정';
  modifyBtn.onclick = () => {
    if (modifyBtn.innerHTML === '수정') {
      modifyBtn.innerHTML = '취소';

      comments.map((v, i) => {
        if (parseInt(i + 1) === id) {
          return;
        } else {
          document.getElementById(i + 1 + 'modifyBtn').innerHTML = '수정';
        }
      });

      const modifyInputComment = document.createElement('input');
      modifyInputComment.id = id + 'modify';
      modifyInputComment.setAttribute('type', 'text');
      modifyInputComment.setAttribute('value', comments[id - 1]);

      const modifySubmitBtn = document.createElement('button');
      modifySubmitBtn.id = id + 'modifySubmit';
      modifySubmitBtn.innerHTML = '등록';
      document
        .getElementById(id)
        .insertAdjacentElement('afterend', modifySubmitBtn);
      document
        .getElementById(id)
        .insertAdjacentElement('afterend', modifyInputComment);
      modifySubmitBtn.onclick = () => {
        console.log('hello?');
      };

      comments.map((v, i) => {
        console.log(v);
        if (parseInt(i + 1) === id) {
          return;
        }
        if (
          document
            .getElementById('showList')
            .contains(document.getElementById(i + 1 + 'modify'))
        ) {
          document.getElementById(i + 1 + 'modify').remove();
          document.getElementById(i + 1 + 'modifySubmit').remove();
        }
      });
    } else {
      document.getElementById(id + 'modify').remove();
      document.getElementById(id + 'modifySubmit').remove();
      modifyBtn.innerHTML = '수정';
    }
  };
  document.getElementById(id).appendChild(modifyBtn);
};