import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { useTranslation } from 'react-i18next';

export default function ProductDetail({ category, detail }) {
    const lang = useAppSelector(state => state.settings.lang);
    const {t} = useTranslation();
  return (
    <React.Fragment>
      <p className="text-md font-bold">{t("product_detail")}</p>
      <table className='w-full'>
        <tbody className='w-full'>
          <tr>
            <td className="w-[20%] text-gray-500">{t("category")}</td>
            <td className="w-[90%]">
              <Link to="/" className="text-blue-500">
                T{t("home")}
              </Link>
              {' > '}
              <Link
                to={`/search?category=${category ? category._id : ''}`}
                className="text-blue-500"
              >
                {category ? category[`name_${lang}`] : ''}
              </Link>
            </td>
          </tr>
          {
            detail && detail.map((d, index)=> <tr key={index}>
                <td className="w-[10%] text-gray-500">{d.key}</td>
                <td className="w-[90%]">{d.value}</td>
            </tr>)
          }
        </tbody>
      </table>
    </React.Fragment>
  );
}
