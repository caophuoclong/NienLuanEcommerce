import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaGoogle, FaRegEnvelope } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthService } from '../../services/auth';
const shopSchema = yup.object({
  shopName: yup.string().required('This field must be not empty!'),
  username: yup.string().required('This field must be not empty!'),
  email: yup
    .string()
    .email('Email invalid!')
    .required('This field must be not empty!'),
  password: yup
    .string()
    .trim()
    .min(8, 'At least 8 characters')
    .required('This field must be not empty!'),
});
const defaultSchema = yup.object({
  firstName: yup.string().required('This field must be not empty!'),
  lastName: yup.string().required('This field must be not empty!'),
  username: yup.string().required('This field must be not empty!'),
  email: yup
    .string()
    .email('Email invalid!')
    .required('This field must be not empty!'),
  password: yup
    .string()
    .trim()
    .min(8, 'At least 8 characters')
    .required('This field must be not empty!'),
  dob: yup.date('Date is invalid!'),
});
export default function Register() {
  const [role, setRole] = useState('USER');
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
  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const response = await AuthService.register(data);
      console.log(`${window.location.origin}/active/${response}`)
    } catch (error) {
      console.log(error);
      // console.log(response.status);

      if (error.response.status === 400) {
        setError(error.response.data.name, {message: error.response.data.message});
      }
    }
  };
  console.log(errors);
  return (
    <div className="flex h-[93vh] min-h-[90vh] w-full items-center justify-center bg-white ">
      <div className="flex h-[80%] w-[90%] items-center justify-center shadow-lg ">
        {/*left side*/}
        <div className="z-10 flex h-full w-full flex-col items-center justify-center space-y-5 bg-green-500 text-center shadow-[0_15px_30px_-5px_rgba(0,0,0,0.3)]">
          <div className="font-sans text-3xl font-bold text-white">
            <p>Welcome Back!</p>
          </div>

          <div className="text-white">
            <p>
              To keep connected with us please login
              <br /> with your personal info
            </p>
          </div>

          <div>
            <Link
              to={'/signin'}
              className="inline-block rounded-full border-2 border-white px-12 py-2 font-semibold text-white hover:bg-white hover:text-green-500"
            >
              SIGN IN
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
              <p>Create Account</p>
            </div>

            <div className="flex w-[70%] justify-center gap-4">
              <p className="font-bold">Account type:</p>
              <div className="flex gap-2">
                <label htmlFor="roleDefault">Default</label>
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
                <label htmlFor="roleShop">Shop</label>
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
              <div className="mx-5 flex w-[70%] gap-1">
                <div className="w-[30%] flex-1">
                  <label htmlFor="fName">
                    First Name{' '}
                    <span className="text-red-500">
                      * {errors && errors.firstName && errors.firstName.message}
                    </span>
                  </label>
                  <input
                    {...register('firstName', { required: true })}
                    id="fName"
                    type="text"
                    placeholder="First Name"
                    className="h-10 w-full rounded-lg border border-zinc-500 bg-transparent px-5 outline-none"
                  />
                </div>
                <div className="w-[30%] flex-1">
                  <label htmlFor="mName">Middle Name</label>
                  <input
                    {...register('middleName', { required: false })}
                    id="mName"
                    type="text"
                    placeholder="Middle Name"
                    className="h-10 w-full rounded-lg border border-zinc-500 bg-transparent px-5 outline-none"
                  />
                </div>
                <div className="w-[30%] flex-1">
                  <label htmlFor="lName">
                    Last Name{' '}
                    <span className="text-red-500">
                      * {errors && errors.lastName && errors.lastName.message}
                    </span>
                  </label>
                  <input
                    {...register('lastName', { required: true })}
                    id="lName"
                    type="text"
                    placeholder="Last Name"
                    className="h-10 w-full rounded-lg border border-zinc-500 bg-transparent px-5 outline-none"
                  />
                </div>
              </div>
            ) : (
              <div className="flex w-[70%] flex-col">
                <label htmlFor="shopName">
                  Shop Name{' '}
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
                  Username{' '}
                  <span className="text-red-500">
                    * {errors && errors.username && errors.username.message}
                  </span>
                </label>
                <input
                  {...register('username', { required: true })}
                  id="username"
                  type="text"
                  placeholder="Username"
                  className="h-10 rounded-lg border border-zinc-500 bg-transparent px-5 outline-none"
                />
              </div>
            </div>

            {role === 'USER' && (
              <div className="mx-5 grid w-[70%] grid-cols-2 gap-1">
                <div className="flex w-full flex-col gap-1">
                  <label htmlFor="gender">
                    Gender{' '}
                    <span className="text-red-500">
                      * {errors && errors.gender && errors.gender.message}
                    </span>
                  </label>
                  <select
                    {...register('gender', { required: true })}
                    name="dropdown"
                    id="gender"
                    placeholder="Gender"
                    defaultValue={"male"}
                    className="h-10 rounded-lg border border-zinc-500 bg-transparent px-5 outline-none"
                  >
                    <option value={'male'}>
                      Male
                    </option>
                    <option value={'female'}>Female</option>
                  </select>
                </div>
                <div className="flex w-full flex-col gap-1">
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
                </div>
              </div>
            )}

            <div className="mx-5 flex w-[70%] flex-col gap-1">
              <label htmlFor="password">
                Password{' '}
                <span className="text-red-500">
                  * {errors && errors.password && errors.password.message}
                </span>
              </label>
              <input
                {...register('password', { required: true })}
                type="password"
                id="password"
                placeholder="Password"
                className="h-10 rounded-lg border border-zinc-500 bg-transparent px-5 outline-none"
              />
            </div>

            <div>
              <input
                className="inline-block rounded-full border-2 border-green-500 px-12 py-2 font-semibold text-green-500 hover:bg-green-500 hover:text-white"
                type="submit"
                value={'SIGN UP'}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
