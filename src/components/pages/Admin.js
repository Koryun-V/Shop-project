import {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import Api from "../../utills/Api";
import Loader from "../common/Loader";

const Admin = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const {data} = await Api.getAdminCategories();
        setCategories(data.categories);
      } catch (error) {
        toast.error('Error fetching categories');
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      {
        loading
          ? <Loader/>
          : <ul>
            {
              categories.map(cat =>
                <li
                  key={cat.id}
                >
                  {cat.name}

                </li>
              )
            }
          </ul>}
    </div>
  );
};

export default Admin;
