import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaGoogle, FaRegEnvelope } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthService } from '../../services/auth';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../app/hooks';
import { toast } from 'react-toastify';

export default function Register() {
  const [role, setRole] = useState('USER');
  const { t } = useTranslation();
  const shopSchema = yup.object({
  shopName: yup.string().required(t("this_field_must_be_filled")),
  username: yup.string().required(t("this_field_must_be_filled")),
  email: yup
    .string()
    .email(t("email_invalid"))
    .required(t("this_field_must_be_filled")),
  password: yup
    .string()
    .trim()
    .min(8, t("password_must_be_at_least_8_characters"))
    .required(t("this_field_must_be_filled")),
});
const defaultSchema = yup.object({
  firstName: yup.string().required(t("this_field_must_be_filled")),
  lastName: yup.string().required(t("this_field_must_be_filled")),
  username: yup.string().required(t("this_field_must_be_filled")),
  email: yup
    .string()
    .email(t("email_invalid"))
    .required(t("this_field_must_be_filled")),
  password: yup
    .string()
    .trim()
    .min(8, t("password_must_be_at_least_8_characters"))
    .required(t("this_field_must_be_filled")),
  // dob: yup.date('Date is invalid!'),
});
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm({
    resolver:
      role === 'USER' ? yupResolver(defaultSchema) : yupResolver(shopSchema),
  });
  console.log(window.location.origin);
  const lang = useAppSelector((state) => state.settings.lang);
  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const response = await AuthService.register(data);
      toast(t("register_success"), {
        type: 'success',
      })
      console.log(`Active Link: ${window.location.origin}/active/${response}`);
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setError(error.response.data.name, {
          message: error.response.data.message,
        });
      }
    }
  };
  return (
    <div className="flex h-[93vh] min-h-[90vh] w-full items-center justify-center bg-white ">
      <div className="flex h-[80%] w-[90%] items-center justify-center shadow-lg ">
        {/*left side*/}
        <div className="z-10 flex h-full w-full flex-col items-center justify-center space-y-5 bg-green-500 text-center shadow-[0_15px_30px_-5px_rgba(0,0,0,0.3)]">
          <div className="font-sans text-3xl font-bold text-white">
            <p>{t('welcome_back')}</p>
          </div>

          <div className="text-white">
            <p>
              {t('let_login_to_connect_with_thousands_of_goods_and_services')}
            </p>
          </div>

          <div>
            <Link
              to={'/signin'}
              className="inline-block rounded-full border-2 border-white px-12 py-2 font-semibold text-white hover:bg-white hover:text-green-500"
            >
              {t('sign_in').toUpperCase()}
            </Link>
          </div>
        </div>

        {/*right side*/}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="z-50 h-full w-full bg-white  shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
        >
          <div className="flex h-full flex-col items-center justify-center space-y-3">
            <div className="font-sans text-3xl font-bold text-green-500">
              <p>{t('create_account')}</p>
            </div>

            <div className="flex w-[70%] justify-center gap-4">
              <p className="font-bold">{t('account_type')}:</p>
              <div className="flex gap-2">
                <label htmlFor="roleDefault">{t('default')}</label>
                <input
                  {...register('role')}
                  onChange={() => setRole('USER')}
                  checked={role === 'USER'}
                  id="roleDefault"
                  value={'USER'}
                  type="radio"
                />
              </div>
              <div className="flex gap-2">
                <label htmlFor="roleShop">{t('seller')}</label>
                <input
                  {...register('role')}
                  onChange={() => setRole('SHOP')}
                  checked={role === 'SHOP'}
                  id="roleShop"
                  value="SHOP"
                  type="radio"
                />
              </div>
            </div>

            {role === 'USER' ? (
              lang === 'vi' ? (
                <div className="mx-5 flex w-[70%] gap-1">
                  <div className="w-[30%] flex-1">
                    <label htmlFor="lName">
                      {t('last_name')}
                      <span className="text-red-500">
                        * {errors && errors.lastName && errors.lastName.message}
                      </span>
                    </label>
                    <input
                      {...register('lastName', { required: true })}
                      id="lName"
                      type="text"
                      placeholder={t('last_name')}
                      className="h-10 w-full rounded-lg border border-zinc-500 bg-transparent px-5 outline-none"
                    />
                  </div>
                  <div className="w-[30%] flex-1">
                    <label htmlFor="mName">{t('middle_name')}</label>
                    <input
                      {...register('middleName', { required: false })}
                      id="mName"
                      type="text"
                      placeholder={t('middle_name')}
                      className="h-10 w-full rounded-lg border border-zinc-500 bg-transparent px-5 outline-none"
                    />
                  </div>
                  <div className="w-[30%] flex-1">
                    <label htmlFor="fName">
                      {t('first_name')}
                      <span className="text-red-500">
                        *{' '}
                        {errors && errors.firstName && errors.firstName.message}
                      </span>
                    </label>
                    <input
                      {...register('firstName', { required: true })}
                      id="fName"
                      type="text"
                      placeholder={t('first_name')}
                      className="h-10 w-full rounded-lg border border-zinc-500 bg-transparent px-5 outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="mx-5 flex w-[70%] gap-1">
                  <div className="w-[30%] flex-1">
                    <label htmlFor="fName">
                      {t('first_name')}
                      <span className="text-red-500">
                        *{' '}
                        {errors && errors.firstName && errors.firstName.message}
                      </span>
                    </label>
                    <input
                      {...register('firstName', { required: true })}
                      id="fName"
                      type="text"
                      placeholder={t('first_name')}
                      className="h-10 w-full rounded-lg border border-zinc-500 bg-transparent px-5 outline-none"
                    />
                  </div>
                  <div className="w-[30%] flex-1">
                    <label htmlFor="mName">{t('middle_name')}</label>
                    <input
                      {...register('middleName', { required: false })}
                      id="mName"
                      type="text"
                      placeholder={t('middle_name')}
                      className="h-10 w-full rounded-lg border border-zinc-500 bg-transparent px-5 outline-none"
                    />
                  </div>
                  <div className="w-[30%] flex-1">
                    <label htmlFor="lName">
                      {t('last_name')}
                      <span className="text-red-500">
                        * {errors && errors.lastName && errors.lastName.message}
                      </span>
                    </label>
                    <input
                      {...register('lastName', { required: true })}
                      id="lName"
                      type="text"
                      placeholder={t('last_name')}
                      className="h-10 w-full rounded-lg border border-zinc-500 bg-transparent px-5 outline-none"
                    />
                  </div>
                </div>
              )
            ) : (
              <div className="flex w-[70%] flex-col">
                <label htmlFor="shopName">
                  {t('shop_name')}
                  <span className="text-red-500">
                    * {errors && errors.shopName && errors.shopName.message}
                  </span>
                </label>
                <input
                  {...register('shopName', { required: true })}
                  className="h-10 rounded-lg border border-zinc-500 bg-transparent px-5 outline-none"
                  id="shopName"
                  placeholder="Shop name"
                  type="text"
                />
              </div>
            )}

            <div className="mx-5 flex w-[70%] flex-col gap-1 space-y-3">
              <div className="flex w-full flex-col gap-1">
                <label htmlFor="email">
                  Email{' '}
                  <span className="text-red-500">
                    * {errors && errors.email && errors.email.message}
                  </span>
                </label>
                <input
                  {...register('email', { required: true })}
                  id="email"
                  type="email"
                  placeholder="Email"
                  className="h-10 rounded-lg border border-zinc-500 bg-transparent px-5 outline-none"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="username">
                  {t('username')}
                  <span className="text-red-500">
                    * {errors && errors.username && errors.username.message}
                  </span>
                </label>
                <input
                  {...register('username', { required: true })}
                  id="username"
                  type="text"
                  placeholder={t('username')}
                  className="h-10 rounded-lg border border-zinc-500 bg-transparent px-5 outline-none"
                />
              </div>
            </div>

            {role === 'USER' && (
              <div className="mx-5 grid w-[70%] grid-cols-2 gap-1">
                <div className="flex w-full flex-col gap-1">
                  <label htmlFor="gender">
                    {t('gender')}
                    <span className="text-red-500">
                      * {errors && errors.gender && errors.gender.message}
                    </span>
                  </label>
                  <select
                    {...register('gender', { required: true })}
                    name="dropdown"
                    id="gender"
                    placeholder="Gender"
                    defaultValue={'male'}
                    className="h-10 rounded-lg border border-zinc-500 bg-transparent px-5 outline-none"
                  >
                    <option value={'male'}>{t('male')}</option>
                    <option value={'female'}>{t('female')}</option>
                  </select>
                </div>
                {/* <div className="flex w-full flex-col gap-1">
                  <label htmlFor="dob">
                    Date of birth{' '}
                    <span className="text-red-500">
                      * {errors && errors.dob && errors.dob.message}
                    </span>
                  </label>
                  <input
                    {...register('dob', { required: true })}
                    type={'date'}
                    id="dob"
                    placeholder="Birthday"
                    className="h-10 rounded-lg border border-zinc-500 bg-transparent px-5 outline-none"
                  />
                </div> */}
              </div>
            )}

            <div className="mx-5 flex w-[70%] flex-col gap-1">
              <label htmlFor="password">
                {t('password')}
                <span className="text-red-500">
                  * {errors && errors.password && errors.password.message}
                </span>
              </label>
              <input
                {...register('password', { required: true })}
                type="password"
                id="password"
                placeholder={t('password')}
                className="h-10 rounded-lg border border-zinc-500 bg-transparent px-5 outline-none"
              />
            </div>

            <div>
              <input
                className="inline-block rounded-full border-2 border-green-500 px-12 py-2 font-semibold text-green-500 hover:bg-green-500 hover:text-white"
                type="submit"
                value={t('sign_up').toUpperCase()}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
