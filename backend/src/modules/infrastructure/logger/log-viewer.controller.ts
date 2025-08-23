import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('logs')
export class LogViewerController {
  @Get()
  serveLogViewer(@Res() res: Response) {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>실시간 로그 뷰어</title>
  <script src="https://cdn.socket.io/4.4.1/socket.io.min.js"></script>
  <style>
    body {
      font-family: monospace;
      margin: 0;
      padding: 0;
      background-color: #1e1e1e;
      color: #ddd;
    }
    
    .container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    
    .header {
      padding: 12px;
      background-color: #333;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .log-container {
      flex: 1;
      overflow-y: auto;
      padding: 10px;
      white-space: pre-wrap;
      font-size: 14px;
      line-height: 1.5;
    }
    
    .footer {
      padding: 12px;
      background-color: #333;
      display: flex;
      gap: 10px;
    }
    
    button {
      background-color: #555;
      border: none;
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
    }
    
    button:hover {
      background-color: #666;
    }
    
    #filter {
      flex: 1;
      padding: 8px;
      background-color: #444;
      border: none;
      border-radius: 4px;
      color: white;
    }
    
    .error { color: #ff5555; }
    .warn { color: #ffaa55; }
    .info { color: #55aaff; }
    .debug { color: #bbbbbb; }
    
    .status {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      display: inline-block;
    }
    
    .connected {
      background-color: #1a841a;
    }
    
    .disconnected {
      background-color: #841a1a;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>실시간 로그 뷰어</h2>
      <div class="status disconnected" id="status">연결 중...</div>
    </div>
    
    <div class="log-container" id="logContainer"></div>
    
    <div class="footer">
      <button id="clearBtn">Clear</button>
      <input type="text" id="filter" placeholder="Filter logs...">
      <button id="pauseBtn">Pause</button>
      <button id="scrollBtn">Scroll to Bottom</button>
    </div>
  </div>
  
  <script>
    // DOM 요소
    const logContainer = document.getElementById('logContainer');
    const statusElement = document.getElementById('status');
    const clearBtn = document.getElementById('clearBtn');
    const filterInput = document.getElementById('filter');
    const pauseBtn = document.getElementById('pauseBtn');
    const scrollBtn = document.getElementById('scrollBtn');
    
    // 상태 변수
    let isPaused = false;
    let logs = [];
    const MAX_LOGS = 1000; // 최대 로그 라인 제한 (메모리 관리)
    
    // 로그 색상 변환
    function colorizeLog(log) {
      return log
        .replace(/ERROR|FATAL|Exception|Error:/gi, '<span class="error">$&</span>')
        .replace(/WARN|WARNING|Warn:/gi, '<span class="warn">$&</span>')
        .replace(/INFO|Notice|Info:/gi, '<span class="info">$&</span>')
        .replace(/DEBUG|TRACE|Debug:/gi, '<span class="debug">$&</span>');
    }
    
    // 로그 필터링 및 렌더링
    function renderLogs() {
      const filterText = filterInput.value.toLowerCase();
      const filteredLogs = filterText 
        ? logs.filter(log => log.toLowerCase().includes(filterText))
        : logs;
      
      logContainer.innerHTML = filteredLogs.map(log => colorizeLog(log)).join('<br>');
      
      if (!isPaused) {
        logContainer.scrollTop = logContainer.scrollHeight;
      }
    }
    
    // WebSocket 연결
    const socket = io(window.location.origin + '/logs', {
      transports: ['websocket', 'polling'],
      path: '/socket.io',
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000
    });
    
    socket.on('connect', () => {
      statusElement.textContent = '연결됨';
      statusElement.className = 'status connected';
      console.log('Socket connected:', socket.id);
    });
    
    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      statusElement.textContent = '연결 오류: ' + error.message;
      statusElement.className = 'status disconnected';
    });
    
    socket.on('disconnect', () => {
      statusElement.textContent = '연결 끊김';
      statusElement.className = 'status disconnected';
    });
    
    socket.on('log', (log) => {
      logs.push(log);
      
      // 최대 로그 수 제한
      if (logs.length > MAX_LOGS) {
        logs = logs.slice(-MAX_LOGS);
      }
      
      renderLogs();
    });
    
    // 이벤트 리스너
    clearBtn.addEventListener('click', () => {
      logs = [];
      renderLogs();
    });
    
    filterInput.addEventListener('input', renderLogs);
    
    pauseBtn.addEventListener('click', () => {
      isPaused = !isPaused;
      pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
    });
    
    scrollBtn.addEventListener('click', () => {
      logContainer.scrollTop = logContainer.scrollHeight;
    });
  </script>
</body>
</html>
    `);
  }
}
