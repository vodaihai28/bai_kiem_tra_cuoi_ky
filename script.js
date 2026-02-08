 const MSSV = "12345678"; // THAY MSSV CỦA BẠN VÀO ĐÂY
    const STORAGE_KEY = `tasks_${MSSV}`;
    let taskList = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    // Hàm thêm công việc
    function addTask() {
        const name = document.getElementById('taskInput').value;
        const priority = document.getElementById('prioritySelect').value;
        const isLastDigitEven = parseInt(MSSV.slice(-1)) % 2 === 0;

        if (!name) return alert("Vui lòng nhập tên công việc!");

        // Logic chống AI: xử lý màu sắc
        let textColor = "black";
        if (name.length > 10) {
            textColor = isLastDigitEven ? "red" : "blue";
        }

        const newTask = { id: Date.now(), name, priority, textColor };
        taskList.push(newTask);
        saveAndRender();
        document.getElementById('taskInput').value = "";
    }
function saveAndRender() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(taskList));
        
        // Xóa nội dung cũ trong các ô
        for (let i = 1; i <= 4; i++) document.getElementById(`box-${i}`).innerHTML = "";

        // Phân loại vào đúng ô dựa trên độ ưu tiên
        taskList.forEach(task => {
            const li = document.createElement('li');
            li.className = "task-item shadow-sm";
            li.style.color = task.textColor;
            li.innerHTML = `<strong>${task.name}</strong>`;
            document.getElementById(`box-${task.priority}`).appendChild(li);
        });
    }

    function clearStorage() {
        if(confirm("Xóa toàn bộ công việc?")) {
            taskList = [];
            saveAndRender();
        }
    }

    // Khởi tạo khi load trang
    saveAndRender();