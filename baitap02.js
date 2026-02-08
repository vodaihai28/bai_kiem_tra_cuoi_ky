
        let todos = JSON.parse(localStorage.getItem('todos')) || [];

        function render() {
            const list = document.getElementById('todo-list');
            list.innerHTML = '';
            todos.forEach((todo, index) => {
                list.innerHTML += `
                    <div class="todo-item">
                        <span>${todo}</span>
                        <button onclick="editTask(${index})">Sửa</button>
                        <button onclick="deleteTask(${index})">Xóa</button>
                    </div>`;
            });
            localStorage.setItem('todos', JSON.stringify(todos));
        }

        function addTask() {
            const input = document.getElementById('todo-input');
            if (input.value) {
                todos.push(input.value);
                input.value = '';
                render();
            }
        }

        function deleteTask(index) {
            todos.splice(index, 1);
            render();
        }

        function editTask(index) {
            const newVal = prompt("Sửa công việc:", todos[index]);
            if (newVal) { todos[index] = newVal; render(); }
        }

        render();
    