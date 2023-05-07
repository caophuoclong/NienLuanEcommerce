import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaEdit } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setUser } from '../../app/slices/home.slice';

export default function Profile() {
  const user = useAppSelector((state) => state.home.user);
  const [state, setState] = useState({});
  const [editState, setEditState] = useState({});
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  useEffect(() => {
    const { firstName, lastName, middleName, auth, ...data } = user;
    setState({
      ...data,
      name: {
        firstName,
        middleName,
        lastName,
      },
      email: auth.email,
      username: auth.username,
      phone: auth.phone,
    });
  }, [user]);
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const excludeKeys = ['_id', 'createdAt', 'shop_name', 'updatedAt', 'avatar'];
  const editableKeys = ['email', 'phone', 'name'];
  const onUpdate = () => {
    let temp = { ...user };
    const editKeys = Object.keys(editState);
    for (const key of editKeys) {
      if (key === 'email' || key === 'phone') {
        temp = {
          ...temp,
          auth: {
            ...temp['auth'],
            [key]: editState[key],
          },
        };
      } else {
        temp[key] = editState[key];
      }
    }
    dispatch(setUser(temp));
    setEditState({});
  };
  return (
    <div className="mx-auto w-2/3 bg-white p-2">
      <p className="text-md border-b font-bold px-2">{t("profile")}</p>
      <div className="flex py-4">
        <div className="w-[80%] px-2">
          {state &&
            Object.keys(state)
              .sort()
              .map((key, i) => {
                if (
                  typeof state[key] === 'string' &&
                  !excludeKeys.includes(key)
                ) {
                  return (
                    <div className="flex w-full" key={i}>
                      <p className="w-[20%]">{t(key)}</p>
                      <div className="flex w-[80%] items-center gap-2">
                        {editableKeys.includes(key) ? (
                          <React.Fragment>
                            <input
                              type="text"
                              className="px-1 outline-none"
                              value={
                                editState[key] ? editState[key] : state[key]
                              }
                              onChange={(e) => {
                                if (e.target.value.length === 0) {
                                  const x = { ...editState };
                                  delete x[key];
                                  setEditState(x);
                                } else {
                                  setEditState({
                                    ...editState,
                                    [key]: e.target.value,
                                  });
                                }
                              }}
                              disabled={!Object.keys(editState).includes(key)}
                            />
                            <button
                              onClick={() => {
                                setEditState({
                                  ...editState,
                                  [key]: '',
                                });
                              }}
                            >
                              <MdEdit size="24px" />
                            </button>
                          </React.Fragment>
                        ) : editState[key] ? (
                          editState[key]
                        ) : (
                          state[key]
                        )}
                      </div>
                    </div>
                  );
                } else if (key === 'name') {
                  const keys2 = Object.keys(state[key]);
                  return (
                    <div className="w-full" key={i}>
                      <div className="flex gap-4">
                        {keys2.map((key, i) => (
                          <p className="w-[25%]" key={i}>
                            {t(key)}
                          </p>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        {keys2.map((key2, i) => (
                          <input
                            key={i}
                            disabled={!Object.keys(editState).includes(key2)}
                            className="w-[25%] rounded-md bg-gray-100 p-2 outline-none"
                            value={
                              editState[key2]
                                ? editState[key2]
                                : state[key][key2]
                            }
                            onChange={(e) =>
                              setEditState({
                                ...editState,
                                [key2]: e.target.value,
                              })
                            }
                          />
                        ))}
                        {editableKeys.includes(key) && (
                          <button
                            onClick={() => {
                              const object = Object.keys(state[key]).reduce(
                                (prev, curr) => {
                                  return {
                                    ...prev,
                                    [curr]: state[key][curr],
                                  };
                                },
                                {},
                              );
                              console.log(object);
                              setEditState({
                                ...editState,
                                ...object,
                              });
                            }}
                          >
                            <MdEdit size="24px" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                }
              })}
          {Object.keys(editState).some((value) => editState[value]) && (
            <button
              className="h-10 w-20 rounded-lg bg-blue-300"
              onClick={onUpdate}
            >
              Update
            </button>
          )}
        </div>
        <div className="flex flex-col w-[20%] items-center justify-center border-l gap-2 p-2">
          <div
            style={{
              backgroundImage: `url(${state.avatar})`,
            }}
            className="h-20 w-20 rounded-full bg-contain bg-no-repeat"
          ></div>
          <label htmlFor="choseAvatar" className="text-sm border-2 cursor-pointer p-2 rounded-md">{t("choseAvatar")}</label>
          <input type={"file"} hidden id="choseAvatar"/>
          <p className="text-xs text-gray-500">Dụng lượng file tối đa 1 MB Định dạng:.JPEG, .PNG</p>
        </div>
      </div>
    </div>
  );
}
