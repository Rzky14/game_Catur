// Representasi bidak catur menggunakan Unicode
const PIECES = {
    WHITE_KING: '♔',
    WHITE_QUEEN: '♕',
    WHITE_ROOK: '♖',
    WHITE_BISHOP: '♗',
    WHITE_KNIGHT: '♘',
    WHITE_PAWN: '♙',
    BLACK_KING: '♚',
    BLACK_QUEEN: '♛',
    BLACK_ROOK: '♜',
    BLACK_BISHOP: '♝',
    BLACK_KNIGHT: '♞',
    BLACK_PAWN: '♟'
};

// State game
let board = [];
let currentPlayer = 'white';
let selectedSquare = null;
let gameHistory = [];
let capturedPieces = { white: [], black: [] };

// Inisialisasi papan catur
function initBoard() {
    board = [
        ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
        ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
        ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
    ];
    currentPlayer = 'white';
    selectedSquare = null;
    gameHistory = [];
    capturedPieces = { white: [], black: [] };
    updateCapturedPieces();
}

// Render papan catur
function renderBoard() {
    const chessboard = document.getElementById('chessboard');
    chessboard.innerHTML = '';

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.className = 'square';
            square.className += (row + col) % 2 === 0 ? ' light' : ' dark';
            square.dataset.row = row;
            square.dataset.col = col;
            square.textContent = board[row][col];
            square.addEventListener('click', handleSquareClick);
            chessboard.appendChild(square);
        }
    }

    updateTurnIndicator();
    checkGameStatus();
}

// Handle klik pada kotak
function handleSquareClick(e) {
    const row = parseInt(e.target.dataset.row);
    const col = parseInt(e.target.dataset.col);

    if (selectedSquare) {
        // Coba gerakkan bidak
        if (movePiece(selectedSquare.row, selectedSquare.col, row, col)) {
            selectedSquare = null;
            clearHighlights();
            renderBoard();
        } else if (board[row][col] && getPieceColor(board[row][col]) === currentPlayer) {
            // Pilih bidak lain
            clearHighlights();
            selectedSquare = { row, col };
            highlightSquare(row, col);
            showValidMoves(row, col);
        } else {
            // Gerakan tidak valid
            clearHighlights();
            selectedSquare = null;
        }
    } else {
        // Pilih bidak
        if (board[row][col] && getPieceColor(board[row][col]) === currentPlayer) {
            selectedSquare = { row, col };
            highlightSquare(row, col);
            showValidMoves(row, col);
        }
    }
}

// Highlight kotak yang dipilih
function highlightSquare(row, col) {
    const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    if (square) {
        square.classList.add('selected');
    }
}

// Tampilkan gerakan valid
function showValidMoves(row, col) {
    const piece = board[row][col];
    const moves = getValidMoves(row, col, piece);

    moves.forEach(move => {
        const square = document.querySelector(`[data-row="${move.row}"][data-col="${move.col}"]`);
        if (square) {
            if (board[move.row][move.col]) {
                square.classList.add('capture-move');
            } else {
                square.classList.add('valid-move');
            }
        }
    });
}

// Hapus highlight
function clearHighlights() {
    document.querySelectorAll('.square').forEach(square => {
        square.classList.remove('selected', 'valid-move', 'capture-move');
    });
}

// Dapatkan warna bidak
function getPieceColor(piece) {
    const whitePieces = ['♔', '♕', '♖', '♗', '♘', '♙'];
    return whitePieces.includes(piece) ? 'white' : 'black';
}

// Validasi gerakan
function isValidMove(fromRow, fromCol, toRow, toCol, piece) {
    // Cek batas papan
    if (toRow < 0 || toRow > 7 || toCol < 0 || toCol > 7) return false;

    // Tidak bisa makan bidak sendiri
    const targetPiece = board[toRow][toCol];
    if (targetPiece && getPieceColor(targetPiece) === getPieceColor(piece)) return false;

    const validMoves = getValidMoves(fromRow, fromCol, piece);
    return validMoves.some(move => move.row === toRow && move.col === toCol);
}

// Dapatkan semua gerakan valid untuk bidak
function getValidMoves(row, col, piece) {
    const moves = [];
    const color = getPieceColor(piece);

    switch (piece) {
        case '♙': // White Pawn
            // Maju 1
            if (row > 0 && !board[row - 1][col]) {
                moves.push({ row: row - 1, col });
            }
            // Maju 2 dari posisi awal
            if (row === 6 && !board[row - 1][col] && !board[row - 2][col]) {
                moves.push({ row: row - 2, col });
            }
            // Makan diagonal
            if (row > 0 && col > 0 && board[row - 1][col - 1] && getPieceColor(board[row - 1][col - 1]) !== color) {
                moves.push({ row: row - 1, col: col - 1 });
            }
            if (row > 0 && col < 7 && board[row - 1][col + 1] && getPieceColor(board[row - 1][col + 1]) !== color) {
                moves.push({ row: row - 1, col: col + 1 });
            }
            break;

        case '♟': // Black Pawn
            // Maju 1
            if (row < 7 && !board[row + 1][col]) {
                moves.push({ row: row + 1, col });
            }
            // Maju 2 dari posisi awal
            if (row === 1 && !board[row + 1][col] && !board[row + 2][col]) {
                moves.push({ row: row + 2, col });
            }
            // Makan diagonal
            if (row < 7 && col > 0 && board[row + 1][col - 1] && getPieceColor(board[row + 1][col - 1]) !== color) {
                moves.push({ row: row + 1, col: col - 1 });
            }
            if (row < 7 && col < 7 && board[row + 1][col + 1] && getPieceColor(board[row + 1][col + 1]) !== color) {
                moves.push({ row: row + 1, col: col + 1 });
            }
            break;

        case '♖':
        case '♜': // Rook
            // Horizontal dan vertikal
            for (let i = row + 1; i < 8; i++) {
                if (addMoveIfValid(moves, i, col, color)) break;
            }
            for (let i = row - 1; i >= 0; i--) {
                if (addMoveIfValid(moves, i, col, color)) break;
            }
            for (let i = col + 1; i < 8; i++) {
                if (addMoveIfValid(moves, row, i, color)) break;
            }
            for (let i = col - 1; i >= 0; i--) {
                if (addMoveIfValid(moves, row, i, color)) break;
            }
            break;

        case '♗':
        case '♝': // Bishop
            // Diagonal
            for (let i = 1; i < 8; i++) {
                if (!addMoveIfValid(moves, row + i, col + i, color)) break;
            }
            for (let i = 1; i < 8; i++) {
                if (!addMoveIfValid(moves, row + i, col - i, color)) break;
            }
            for (let i = 1; i < 8; i++) {
                if (!addMoveIfValid(moves, row - i, col + i, color)) break;
            }
            for (let i = 1; i < 8; i++) {
                if (!addMoveIfValid(moves, row - i, col - i, color)) break;
            }
            break;

        case '♘':
        case '♞': // Knight
            const knightMoves = [
                [-2, -1], [-2, 1], [-1, -2], [-1, 2],
                [1, -2], [1, 2], [2, -1], [2, 1]
            ];
            knightMoves.forEach(([dr, dc]) => {
                addMoveIfValid(moves, row + dr, col + dc, color);
            });
            break;

        case '♕':
        case '♛': // Queen (kombinasi Rook dan Bishop)
            // Horizontal dan vertikal
            for (let i = row + 1; i < 8; i++) {
                if (addMoveIfValid(moves, i, col, color)) break;
            }
            for (let i = row - 1; i >= 0; i--) {
                if (addMoveIfValid(moves, i, col, color)) break;
            }
            for (let i = col + 1; i < 8; i++) {
                if (addMoveIfValid(moves, row, i, color)) break;
            }
            for (let i = col - 1; i >= 0; i--) {
                if (addMoveIfValid(moves, row, i, color)) break;
            }
            // Diagonal
            for (let i = 1; i < 8; i++) {
                if (addMoveIfValid(moves, row + i, col + i, color)) break;
            }
            for (let i = 1; i < 8; i++) {
                if (addMoveIfValid(moves, row + i, col - i, color)) break;
            }
            for (let i = 1; i < 8; i++) {
                if (addMoveIfValid(moves, row - i, col + i, color)) break;
            }
            for (let i = 1; i < 8; i++) {
                if (addMoveIfValid(moves, row - i, col - i, color)) break;
            }
            break;

        case '♔':
        case '♚': // King
            const kingMoves = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1], [0, 1],
                [1, -1], [1, 0], [1, 1]
            ];
            kingMoves.forEach(([dr, dc]) => {
                addMoveIfValid(moves, row + dr, col + dc, color);
            });
            break;
    }

    return moves;
}

// Helper function untuk menambahkan gerakan valid
function addMoveIfValid(moves, row, col, color) {
    if (row < 0 || row > 7 || col < 0 || col > 7) return true;

    const targetPiece = board[row][col];
    if (!targetPiece) {
        moves.push({ row, col });
        return false;
    } else if (getPieceColor(targetPiece) !== color) {
        moves.push({ row, col });
        return true;
    }
    return true;
}

// Gerakkan bidak
function movePiece(fromRow, fromCol, toRow, toCol) {
    const piece = board[fromRow][fromCol];

    if (!isValidMove(fromRow, fromCol, toRow, toCol, piece)) {
        return false;
    }

    // Simpan state untuk undo
    gameHistory.push({
        board: board.map(row => [...row]),
        currentPlayer,
        capturedPieces: {
            white: [...capturedPieces.white],
            black: [...capturedPieces.black]
        }
    });

    // Tangkap bidak jika ada
    const capturedPiece = board[toRow][toCol];
    if (capturedPiece) {
        if (getPieceColor(capturedPiece) === 'white') {
            capturedPieces.black.push(capturedPiece);
        } else {
            capturedPieces.white.push(capturedPiece);
        }
    }

    // Pindahkan bidak
    board[toRow][toCol] = piece;
    board[fromRow][fromCol] = '';

    // Promosi pawn
    if ((piece === '♙' && toRow === 0) || (piece === '♟' && toRow === 7)) {
        board[toRow][toCol] = piece === '♙' ? '♕' : '♛';
    }

    // Ganti giliran
    currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
    updateCapturedPieces();

    return true;
}

// Update indikator giliran
function updateTurnIndicator() {
    const turnIndicator = document.getElementById('currentTurn');
    turnIndicator.textContent = `Giliran: ${currentPlayer === 'white' ? 'Putih' : 'Hitam'}`;
}

// Update bidak yang tertangkap
function updateCapturedPieces() {
    document.getElementById('capturedWhite').textContent = capturedPieces.white.join(' ');
    document.getElementById('capturedBlack').textContent = capturedPieces.black.join(' ');
}

// Cek status game (check, checkmate)
function checkGameStatus() {
    const status = document.getElementById('status');
    const kingInCheck = isKingInCheck(currentPlayer);

    if (kingInCheck) {
        if (isCheckmate(currentPlayer)) {
            status.textContent = `Skakmat! ${currentPlayer === 'white' ? 'Hitam' : 'Putih'} Menang!`;
            status.className = 'status checkmate';
        } else {
            status.textContent = 'Skak!';
            status.className = 'status check';
        }
    } else {
        status.textContent = '';
        status.className = 'status';
    }
}

// Cek apakah raja dalam skak
function isKingInCheck(color) {
    // Cari posisi raja
    let kingRow, kingCol;
    const kingPiece = color === 'white' ? '♔' : '♚';

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            if (board[row][col] === kingPiece) {
                kingRow = row;
                kingCol = col;
                break;
            }
        }
    }

    // Cek apakah ada bidak lawan yang bisa menyerang raja
    const opponentColor = color === 'white' ? 'black' : 'white';
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = board[row][col];
            if (piece && getPieceColor(piece) === opponentColor) {
                const moves = getValidMoves(row, col, piece);
                if (moves.some(move => move.row === kingRow && move.col === kingCol)) {
                    return true;
                }
            }
        }
    }

    return false;
}

// Cek checkmate
function isCheckmate(color) {
    // Coba semua gerakan yang mungkin
    for (let fromRow = 0; fromRow < 8; fromRow++) {
        for (let fromCol = 0; fromCol < 8; fromCol++) {
            const piece = board[fromRow][fromCol];
            if (piece && getPieceColor(piece) === color) {
                const moves = getValidMoves(fromRow, fromCol, piece);
                for (const move of moves) {
                    // Simulasi gerakan
                    const originalPiece = board[move.row][move.col];
                    board[move.row][move.col] = piece;
                    board[fromRow][fromCol] = '';

                    const stillInCheck = isKingInCheck(color);

                    // Kembalikan
                    board[fromRow][fromCol] = piece;
                    board[move.row][move.col] = originalPiece;

                    if (!stillInCheck) {
                        return false;
                    }
                }
            }
        }
    }

    return true;
}

// Reset game
function resetGame() {
    initBoard();
    renderBoard();
    document.getElementById('status').textContent = '';
}

// Undo gerakan terakhir
function undoMove() {
    if (gameHistory.length === 0) return;

    const lastState = gameHistory.pop();
    board = lastState.board;
    currentPlayer = lastState.currentPlayer;
    capturedPieces = lastState.capturedPieces;

    clearHighlights();
    selectedSquare = null;
    renderBoard();
}

// Event listeners
document.getElementById('resetBtn').addEventListener('click', resetGame);
document.getElementById('undoBtn').addEventListener('click', undoMove);

// Inisialisasi game
initBoard();
renderBoard();
