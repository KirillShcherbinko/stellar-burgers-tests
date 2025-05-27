import {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  FormEvent,
  FormEventHandler,
  useRef,
  useState
} from 'react';
import { IFormProps } from './types';

import styles from './form.module.css';
import clsx from 'clsx';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import { namePattern } from '../../utils/constants';

export const Form: FC<IFormProps> = ({ setMode, className }) => {
  ////////// Состояния полей формы //////////
  const [nameValue, setNameValue] = useState<string>('');
  const [nameError, setNameError] = useState<boolean>(false);
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [repeatPasswordValue, setRepeatPasswordValue] = useState<string>('');
  const [repeatPasswordError, setIsRepeatPasswordError] =
    useState<boolean>(false);

  ////////// Ссылка на форму //////////
  const formRef = useRef<HTMLFormElement>(null);

  ////////// Обработчики изменений полей //////////
  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (
    evt: ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = evt.target.value;
    setNameValue(newValue);
    namePattern.test(newValue) ? setNameError(false) : setNameError(true);
  };

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (
    evt: ChangeEvent<HTMLInputElement>
  ) => {
    setEmailValue(evt.target.value);
  };

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (
    evt: ChangeEvent<HTMLInputElement>
  ) => {
    setIsRepeatPasswordError(false);
    setPasswordValue(evt.target.value);
  };

  const handleRepeatPasswordChange: ChangeEventHandler<HTMLInputElement> = (
    evt: ChangeEvent<HTMLInputElement>
  ) => {
    setIsRepeatPasswordError(false);
    setRepeatPasswordValue(evt.target.value);
  };

  ////////// Обработчик отправки формы //////////
  const handleSubmit: FormEventHandler<HTMLFormElement> = (
    evt: FormEvent<HTMLFormElement>
  ) => {
    evt.preventDefault();

    if (passwordValue !== repeatPasswordValue) {
      setIsRepeatPasswordError(true);
      return;
    }

    setIsRepeatPasswordError(false);

    setMode('complete');
  };

  return (
    <form
      className={clsx(styles.form, className)}
      ref={formRef}
      onSubmit={handleSubmit}
      data-testcyid='form'
    >
      <div className={styles.icon} />
      <div className={styles.text_box}>
        <p className='text text_type_main-large'>Мы нуждаемся в вашей силе!</p>
        <p className={clsx(styles.text, 'text text_type_main-medium')}>
          Зарегистрируйтесь на нашей платформе, чтобы присоединиться к списку
          контрибьюторов
        </p>
      </div>
      <fieldset className={styles.fieldset}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={handleNameChange}
          value={nameValue}
          name={'name'}
          error={nameError}
          errorText={'Некорректный формат имени'}
          size={'default'}
          required
          data-testid='name-input'
          extraClass={clsx(styles.input, { [styles.input_error]: nameError })}
        />
        <EmailInput
          onChange={handleEmailChange}
          value={emailValue}
          name={'email'}
          isIcon={false}
          required
          data-testid='email-input'
          extraClass={clsx(styles.input, { [styles.input_error]: false })}
        />
        <PasswordInput
          onChange={handlePasswordChange}
          value={passwordValue}
          name={'password'}
          required
          data-testid='password-input'
          extraClass={clsx(styles.input, { [styles.input_error]: false })}
        />
        <PasswordInput
          onChange={handleRepeatPasswordChange}
          value={repeatPasswordValue}
          name={'repeatPassword'}
          placeholder='Повторите пароль'
          required
          data-testid='repeat-password-input'
          extraClass={clsx(styles.input, {
            [styles.input_error]: repeatPasswordError
          })}
        />
        {repeatPasswordError && (
          <p className='text input__error text_type_main-default mt-2 mb-2'>
            Пароли не совпадают
          </p>
        )}
        <Button
          htmlType='submit'
          type='primary'
          size='medium'
          disabled={!formRef.current?.checkValidity()}
        >
          Зарегистрироваться
        </Button>
      </fieldset>
      <div className={styles.signin_box}>
        <p className='text text_type_main-default text_color_inactive'>
          Уже зарегистрированы?
        </p>
        <Button
          htmlType='button'
          type='secondary'
          size='medium'
          extraClass={styles.signin_btn}
        >
          Войти
        </Button>
      </div>
    </form>
  );
};
