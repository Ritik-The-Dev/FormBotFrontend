import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import { USERDATA } from "../recoil/recoil";

const API_URL = "https://form-bot-backend-eight.vercel.app/api/v1";

// Used
export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      toast.success("Login successful!");
      return response.data;
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message);
      setError(err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
// Used
export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/register`, payload);
      toast.success("User registered successfully!");
      return response.data;
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message);
      setError(err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};
// Used
export const useGetUserData = (token) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${API_URL}/get-user-data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(data.data);
    } catch (err) {
      localStorage.removeItem("token");
      localStorage.removeItem("type");
    window.location.reload()
      toast.error(err.response ? err.response.data.message : err.message);
      setError(err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  return { getUserData, userData, loading, error };
};
// Used
export const useCreateFolder = (token) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createFolder = async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/create-folder`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Folder created successfully!");
      return response.data;
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message);
      setError(err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  return { createFolder, loading, error };
};
// Used
export const useDeleteFolder = (token) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteFolder = async (folderId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.delete(
        `${API_URL}/delete-folder/${folderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Folder deleted successfully!");
      return response.data;
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message);
      setError(err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteFolder, loading, error };
};
// Used
export const useCreateForm = (token) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createForm = async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/create-form`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Form created successfully!");
      return response.data;
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message);
      setError(err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  return { createForm, loading, error };
};
// Used
export const useDeleteForm = (token) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteForm = async (formId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.delete(`${API_URL}/delete-form/${formId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Form deleted successfully!");
      return response.data;
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message);
      setError(err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteForm, loading, error };
};
// Used
export const useUpdateFormData = (token) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateFormData = async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.patch(
        `${API_URL}/update-form-data`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Form data updated successfully!");
      return response.data;
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message);
      setError(err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  return { updateFormData, loading, error };
};
// Used
export const useGetFormData = (token) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(null);

  const getFormData = async (formId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${API_URL}/getformData/${formId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData(response.data.data);
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message);
      setError(err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  return { getFormData, formData, loading, error };
};
// Used
export const useUpdateUserData = (token) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUserData = async (name, email, oldPassword, newPassword) => {
    setLoading(true);
    setError(null);

    const payload = {
      name,
      email,
      oldPassword,
      newPassword,
    };

    try {
      const response = await axios.patch(`${API_URL}/updateUser`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("User data updated successfully!");
      return response.data;
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message);
      setError(err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  return { updateUserData, loading, error };
};
// Used
export const useSendWorkspaceInvite = (token) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendWorkspaceInvite = async (email, type) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${API_URL}/send-workspace-invite`,
        { email, type },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Workspace invite sent successfully!");
      return response.data;
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message);
      setError(err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendWorkspaceInvite, loading, error };
};
export const useAcceptWorkspaceInvite = (token) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const acceptWorkspaceInvite = async (id, type) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${API_URL}/accept-workspace-invite`,
        { id, type },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Workspace invite sent successfully!");
      return response.data;
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message);
      setError(err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  return { acceptWorkspaceInvite, loading, error };
};
export const useSwitchWorkspace = (token) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const switchWorkspace = async (sharedId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${API_URL}/switch-workspace`,
        { sharedId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Workspace switched successfully!");
      return response.data;
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message);
      setError(err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  return { switchWorkspace, loading, error };
};
// Used
export const useSubmitFormResponse = (token) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitFormResponse = async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${API_URL}/submit-form-response`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Form response submitted successfully!");
      return response.data;
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message);
      setError(err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  return { submitFormResponse, loading, error };
};
// Used
export const useUpdateFormViewCount = (token) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateFormViewCount = async (formId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.patch(
        `${API_URL}/viewFormData/${formId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message);
      setError(err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  return { updateFormViewCount, loading, error };
};
// Used
export const useUpdateFormStartedCount = (token) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateFormStartedCount = async (formId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.patch(
        `${API_URL}/startedFormData/${formId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message);
      setError(err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  return { updateFormStartedCount, loading, error };
};
