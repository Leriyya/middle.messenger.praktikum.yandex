export const validateLogin = (value: string): string => {
  const loginRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]{3,20}$/;

  if (value.length < 3 || value.length > 20) {
    return "Логин должен состоять от 3 до 20 символов";
  } else if (/^\d+$/.test(value)) {
    return "Логин не может состоять только из цифр";
  } else if (/[^a-zA-Z0-9_-]/.test(value)) {
    return "Только латинские буквы, цифры, дефис и нижнее подчёркивание";
  } else if (!/[a-zA-Z]/.test(value)) {
    return "В логине должна быть хотя бы одна буква";
  } else if (!loginRegex.test(value)) {
    return "Некорректный логин";
  }
  return "";
};

export const validatePassword = (value: string): string => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{8,40}$/;

  if (value.length < 8 || value.length > 40) {
    return "Пароль должен состоять от 8 до 40 символов";
  } else if (!/[A-Z]/.test(value)) {
    return "Пароль должен содержать одну заглавную букву";
  } else if (!/\d/.test(value)) {
    return "Пароль должен содержать одну цифру";
  } else if (!passwordRegex.test(value)) {
    return "Некорректный пароль";
  }
  return "";
};

export const validateEmail = (value: string): string => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(value)) {
    return "Некорректный email";
  }
  return "";
};

export const validatePhone = (value: string): string => {
  const phoneRegex = /^\+?\d{10,15}$/;

  if (!/^\+?/.test(value)) {
    return "Телефон должен начинаться с плюса";
  } else if (value.length < 10 || value.length > 15) {
    return "Телефон должен состоять от 10 до 15 символов";
  } else if (!/^\+?\d+$/.test(value)) {
    return "Телефон должен содержать только цифры";
  } else if (!phoneRegex.test(value)) {
    return "Некорректный номер телефона";
  }
  return "";
};

export const validateName = (value: string): string => {
  const nameRegex = /^[A-ZА-Я][a-zа-я-]*$/;

  if (!value) {
    return "Обязательное поле";
  } else if (!/^[A-ZА-Я]/.test(value)) {
    return "Первая буква должна быть заглавной";
  } else if (/[0-9!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/.test(value)) {
    return "Нельзя использовать цифры и спецсимволы";
  } else if (/\s/.test(value)) {
    return "Используй дефис вместо пробелов";
  } else if (!nameRegex.test(value)) {
    return "Некорректное имя или фамилия";
  }
  return "";
};

export const validateMessage = (value: string): string => {
  if (value.length < 1) {
    return "Введите сообщение";
  }
  return "";
};
