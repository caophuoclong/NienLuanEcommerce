import React, { useContext, useEffect, useState } from 'react';
import { AddressService } from '../../../../services/address';
import Input from './Input';
import { useTranslation } from 'react-i18next';
import Select from './Select';
import { CheckoutContext } from '../..';
import {
  SET_ADDRESS_DETAIL,
  SET_DISTRICT,
  SET_LIST_DISTRCIT,
  SET_LIST_PROVINCE,
  SET_LIST_WARD,
  SET_NAME,
  SET_PHONE,
  SET_PROVINCE,
  SET_WARD,
} from '../../actionType';

export default function NewAddress() {
  const [
    {
      listProvince,
      listDistrict,
      listWard,

      address: { ward, province, district, detail, name, phone },
    },
    dispatch,
  ] = useContext(CheckoutContext);
  useEffect(() => {
    (async () => {})();
  }, []);
  useEffect(() => {
    (async () => {
      const response = await AddressService.getAllProvince();
      dispatch({
        type: SET_LIST_PROVINCE,
        payload: response,
      });
    })();
  }, []);
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-2">
      <Input
        required
        name={'Name'}
        value={name}
        onChange1={(value) =>
          dispatch({
            type: SET_NAME,
            payload: value,
          })
        }
      />
      <Input
        required
        number
        name="Phone"
        value={phone}
        onChange1={(value) =>
          dispatch({
            type: SET_PHONE,
            payload: value,
          })
        }
      />
      {listProvince.length > 0 && (
        <div className="flex gap-2 py-2">
          <div className="flex-1">
            <div className="font-sm font-light italic">
              Province <span className="text-red-600">*</span>
            </div>
            <Select
              list={listProvince}
              value={province}
              onChange={async (value) => {
                dispatch({
                  type: SET_PROVINCE,
                  payload: value,
                });
                const response = await AddressService.getDistrict(value.code);
                dispatch({
                  type: SET_LIST_DISTRCIT,
                  payload: response,
                });
                dispatch({
                  type: SET_DISTRICT,
                  payload: '',
                });
              }}
            />
          </div>
          <div className="flex-1">
            <div className="font-sm font-light italic">
              District <span className="text-red-600">*</span>
            </div>
            <Select
              list={listDistrict}
              value={district}
              onChange={async (value) => {
                dispatch({
                  type: SET_DISTRICT,
                  payload: value,
                });

                const response = await AddressService.getWards(value.code);
                dispatch({
                  type: SET_LIST_WARD,
                  payload: response,
                });
                dispatch({
                  type: SET_WARD,
                  payload: '',
                });
              }}
            />
          </div>
          <div className="flex-1">
            <div className="font-sm font-light italic">
              Ward <span className="text-red-600">*</span>
            </div>
            <Select
              list={listWard}
              value={ward}
              onChange={async (value) => {
                dispatch({
                  type: SET_WARD,
                  payload: value,
                });
              }}
            />
          </div>
        </div>
      )}
      <div>
        <label htmlFor="addressDetail" className="font-sm font-light italic">
          Address Detail (optional)
        </label>
        <textarea
          id="addressDetail"
          className="w-full resize-none rounded-md border p-2 outline-none ring-0"
          placeholder="Address Detail"
          rows={3}
          draggable={false}
          value={detail}
          onChange={(e) =>
            dispatch({
              type: SET_ADDRESS_DETAIL,
              payload: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
}
