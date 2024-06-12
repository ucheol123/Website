import { login, logout, checkAuthState } from 'firebaseAuth.js';  // 파일 경로는 실제 프로젝트 구조에 맞게 수정해주세요.

// 로그아웃 후 리다이렉트 함수
function logoutAndRedirect() {
    logout()
    .then(() => {
        // 로그아웃 성공
        console.log("로그아웃 성공");
        window.location.href = "index.html"; // 로그아웃 후 index.html로 리다이렉트
    })
    .catch((error) => {
        // 로그아웃 실패
        console.error("로그아웃 실패:", error);
    });
}

// 현재 로그인 상태 확인 및 처리
checkAuthState(user => {
    if (user) {
        console.log("사용자 로그인 상태:", user);
        // 로그인된 상태 처리 (예: UI 업데이트, 사용자 정보 표시 등)
    } else {
        console.log("사용자 로그아웃 상태");
        // 로그아웃된 상태 처리 (예: 로그인 UI 표시)
    }
});