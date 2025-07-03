<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List Sederhana</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <link href="style.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6">
                <div class="card">
                    <div class="card-header text-center">
                        <h2 class="mb-0">
                            <i class="fas fa-tasks me-2"></i>
                            To-Do List Saya
                        </h2>
                    </div>
                    <div class="card-body">
                        <!-- Form Tambah Tugas -->
                        <form id="taskForm" class="mb-4">
                            <div class="input-group">
                                <input type="text" class="form-control form-control-lg" 
                                       id="taskInput" placeholder="Masukkan tugas baru..." required>
                                <button class="btn btn-gradient btn-lg px-4" type="submit">
                                    <i class="fas fa-plus me-1"></i>
                                    Tambah
                                </button>
                            </div>
                        </form>
                        
                        <!-- Statistik -->
                        <div class="row mb-3">
                            <div class="col-4 text-center">
                                <div class="text-primary">
                                    <i class="fas fa-list"></i>
                                    <div id="totalTasks" class="fw-bold">0</div>
                                    <small class="text-muted">Total</small>
                                </div>
                            </div>
                            <div class="col-4 text-center">
                                <div class="text-success">
                                    <i class="fas fa-check-circle"></i>
                                    <div id="completedTasks" class="fw-bold">0</div>
                                    <small class="text-muted">Selesai</small>
                                </div>
                            </div>
                            <div class="col-4 text-center">
                                <div class="text-warning">
                                    <i class="fas fa-clock"></i>
                                    <div id="pendingTasks" class="fw-bold">0</div>
                                    <small class="text-muted">Pending</small>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Daftar Tugas -->
                        <div id="tasksList">
                            <div class="empty-state">
                                <i class="fas fa-clipboard-list"></i>
                                <h5>Belum ada tugas</h5>
                                <p>Tambahkan tugas pertama Anda untuk memulai!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Edit Task -->
    <div class="modal fade" id="editModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Tugas</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="editForm">
                        <input type="hidden" id="editTaskId">
                        <div class="mb-3">
                            <label for="editTaskText" class="form-label">Tugas</label>
                            <input type="text" class="form-control" id="editTaskText" required>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
                    <button type="button" class="btn btn-gradient" id="saveEditBtn">Simpan</button>
                </div>
            </div>
        </div>
    </div>

    <!-- JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
    <script src="script.js"></script>
</body>
</html>