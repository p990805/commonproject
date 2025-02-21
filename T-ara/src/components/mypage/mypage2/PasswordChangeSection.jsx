import { useState } from "react";
import api from "../../../api";

const PasswordChangeSection = () => {
  const [showForm, setShowForm] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 토큰 존재 여부 확인 (여기서 토큰 만료 여부도 체크할 수 있다면 추가)
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("로그인이 필요한 서비스입니다.");
      return;
    }
    
    setIsLoading(true);
    setError('');
    setMessage('');
    try {
      const response = await api.post('/member/modify/password', { oldPassword, newPassword });
      if (response.status === 200) {
        setMessage(response.data.message || '비밀번호 변경이 완료되었습니다.');
        setOldPassword('');
        setNewPassword('');
        // 필요에 따라 폼을 숨길 수 있습니다.
        // setShowForm(false);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('비밀번호 변경 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center gap-10">
        <p className="w-32 font-black text-lg">비밀번호</p>
        <button
          className="cursor-pointer bg-neutral-600 text-white h-[42px] px-4 flex items-center justify-center rounded text-sm"
          onClick={() => setShowForm(!showForm)}
        >
          비밀번호 변경
        </button>
      </div>
      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 p-4 border rounded">
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="oldPassword">
              현재 비밀번호
            </label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              required
              autoComplete="current-password"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="newPassword">
              새 비밀번호
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              required
              autoComplete="new-password"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {message && <p className="text-green-500 text-sm mb-2">{message}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isLoading ? '변경중...' : '비밀번호 변경'}
          </button>
        </form>
      )}
    </div>
  );
};

export default PasswordChangeSection;
