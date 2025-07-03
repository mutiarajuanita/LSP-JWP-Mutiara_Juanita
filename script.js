// Data tasks disimpan dalam memori
let tasks = [];
let taskIdCounter = 1;

// DOM Elements
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const tasksList = document.getElementById('tasksList');
const editModal = new bootstrap.Modal(document.getElementById('editModal'));
const editTaskId = document.getElementById('editTaskId');
const editTaskText = document.getElementById('editTaskText');
const saveEditBtn = document.getElementById('saveEditBtn');

// Event Listeners
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    addTask();
});

saveEditBtn.addEventListener('click', function() {
    saveEdit();
});

// Fungsi tambah tugas
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Mohon masukkan teks tugas!');
        return;
    }
    
    const newTask = {
        id: taskIdCounter++,
        text: taskText,
        completed: false,
        createdAt: new Date().toLocaleString('id-ID')
    };
    
    tasks.push(newTask);
    taskInput.value = '';
    renderTasks();
    updateStats();
}

// Fungsi render tasks menggunakan forEach
function renderTasks() {
    if (tasks.length === 0) {
        tasksList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clipboard-list"></i>
                <h5>Belum ada tugas</h5>
                <p>Tambahkan tugas pertama Anda untuk memulai!</p>
            </div>
        `;
        return;
    }

    // Kosongkan container terlebih dahulu
    tasksList.innerHTML = '';
    
    // Gunakan forEach untuk menampilkan setiap task
    tasks.forEach(task => {
        const taskHTML = `
            <div class="task-item ${task.completed ? 'task-completed' : ''}">
                <div class="d-flex align-items-center">
                    <div class="form-check me-3">
                        <input class="form-check-input task-checkbox" type="checkbox" 
                               data-task-id="${task.id}" ${task.completed ? 'checked' : ''}>
                    </div>
                    <div class="flex-grow-1">
                        <div class="task-text">${escapeHtml(task.text)}</div>
                        <small class="text-muted">
                            <i class="fas fa-clock me-1"></i>
                            ${task.createdAt}
                        </small>
                    </div>
                    <div class="task-actions">
                        <button class="btn btn-sm btn-outline-primary me-1 edit-btn" 
                                data-task-id="${task.id}" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger delete-btn" 
                                data-task-id="${task.id}" title="Hapus">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Tambahkan HTML ke container
        tasksList.innerHTML += taskHTML;
    });

    // Add event listeners untuk checkbox
    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const taskId = parseInt(this.dataset.taskId);
            toggleTask(taskId);
        });
    });

    // Add event listeners untuk tombol edit
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const taskId = parseInt(this.dataset.taskId);
            editTask(taskId);
        });
    });

    // Add event listeners untuk tombol hapus
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const taskId = parseInt(this.dataset.taskId);
            deleteTask(taskId);
        });
    });
}

// Fungsi untuk escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Fungsi toggle status tugas
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
        updateStats();
    }
}

// Fungsi edit tugas
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        editTaskId.value = task.id;
        editTaskText.value = task.text;
        editModal.show();
    }
}

// Fungsi simpan edit
function saveEdit() {
    const id = parseInt(editTaskId.value);
    const newText = editTaskText.value.trim();
    
    if (newText === '') {
        alert('Mohon masukkan teks tugas!');
        return;
    }
    
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.text = newText;
        renderTasks();
        updateStats();
        editModal.hide();
    }
}

// Fungsi hapus tugas
function deleteTask(id) {
    if (confirm('Yakin ingin menghapus tugas ini?')) {
        const initialLength = tasks.length;
        tasks = tasks.filter(t => t.id !== id);
        renderTasks();
        updateStats();
        
        // Show success message
        if (tasks.length < initialLength) {
            console.log('Tugas berhasil dihapus');
        }
    }
}

// Fungsi update statistik
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    
    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = completed;
    document.getElementById('pendingTasks').textContent = pending;
}

// Inisialisasi aplikasi
document.addEventListener('DOMContentLoaded', function() {
    updateStats();
    renderTasks();
});