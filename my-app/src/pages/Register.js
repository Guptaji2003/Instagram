import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const backendurl=process.env.REACT_APP_API_URL;

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();
  const [input, setinput] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  const postdata = async (e) => {
    e.preventDefault();

    try {
      setloading(true);
      const res = await axios.post(`${backendurl}/register`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
      }else{
        toast.error(res.data.error);
      }
      setinput({
        name: "",
        username: "",
        email: "",
        password: "",
      });
      console.log(res.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <div className="flex  items-center w-screen h-screen justify-center">
        <div className="shadow-lg flex flex-col gap-2 p-8">
          <div className="my-4">
            <h1 className="flex justify-center font-bold text-xl"><img width={60} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX///8dHRsAAADPz82JiYkbGxkQEA0REQ8SEg4ZGRcWFhQeHhsdHRz4+PgVFROzs7Py8vIGBgBdXV3JycmcnJzf39/Z2dns7Oyjo6K9vb2BgYEtLSyOjo5UVFRLS0tlZWQ0NDRtbW07OzvCwsJ1dXVGRkWrq6uioqFycnFYWFgpKSlPT0+VlZUkJCLV1dN9fXvbgxXrAAARE0lEQVR4nO1d53rquhINA3Kv9NBxKink/d/uAkHFtmSPbdlkn8v6c863A8jLkqZr9PBwxx133HHHHXfccccdd9xxxx0dw49+4d/6QTQjmjzOV++Hz2Rpwi+CZbI5vK/mj5Po1g/XEP40HBy8EyXDNIPAsUnvF8S2HdM0jdNf7MMgnP6bcxqNVuszt+BEy+1Jcf5n4px5rlejf2w2p+NNALFD5MzycGIINl/TWz82FqPFrgo7geXup3/rhy/HceGCZVdld4Hbsy34XhxvTaEIs7cPMEvpKXblL04kl2+zWxNRoL8FIJ7XgN6VZAz7vziRj59gKfceOclM04iBIjbMoo1KTNg83ppQBmECjmJGLmoPluv3n9X8NTzj9W31sz8sz/9sKPYscSAJb01KQPgB+Qd1e8Q6kVtuv8LjTKbT/dkx/Nourzoz/2rg469wfNpJ+J2Fvzcc98sVedQfD72TepFx3D118PxlmK4z/E6yhAQAn+Mj3hjzj+PPk7mam0ob1rc2A6JFfv85AMOwusCfhcM4/2MBLG5qzz16cfq9u7YBm7DuM0XhBozMRJKY3E6szobZDWiDvZo0+s3JygLHTWlNAocbTeMrmNnl+RlqcIQeXyBI/7AJt5Cq0RbS6ymAgy67eXTIcCSw7Xwa+99Glp9OS+t4uAgdbgIapGO3Y5zegTZ86n6A/ia9Rgh8aR6hCP4Q0oMv29DMT8vMKMPOoh2TXWqFWvG4pYHGYImuipE0k9NojFJ6+fRq2xt3tgWRYgCj1oYSEKb2hwnt6uNHUSV5XhdqYwWCk+vBsG0pHol7/kRx0PJ4Dz/i7nfgte3xHs6WBd8Vbg9+2h3tWSTY1c6fJKJkg+c2x3oXCcK+zaFE+PvUuO/tjSQStGHe3kA5zEXx1h7FZ+A2vxN3IrgZRqIR1RbFhTCDwbIj5cswWQrGeDviZsUIeicZ073HFonyBlb6BwiFGTRebpEP8zexQFG76h9x88mFoe5fR0JU/roNuIlgycBW729XwJZT9ECrJPB33KwwbjWDZwz5QnV2OrfKkG9y40Xj71bHxmjlVY/54rCSkjc3G72OV4N6WI1fRyWBVj8xmVIGbX7pkRL0es6ySE1M3g6XxJJ1gvEL+l81LPF/zumpw1vRDouWfMOAptBJ9M0sJjtWDz4bJxBnwoB1QIIYkrF6KifcgLO/9ajlPV/6ahE9+4ll+ZmasCH+Ub5LQXEZWoz/V74JlcZ2tABD+qj1YagTFm/siVwdin+GeGNhnM026OGoevw91xnQPOd/YFvLSeSf8LPRb10gsFUIbq6eg8Yq41FYo/KdMd0ZJdUJ9WHs5OnDifBUDdep79lU/ShiMn1wEPUVdWErFMIrc1WJ3UyeLuiK90z5cuhnV+hpZMcwoA5iK5/qJgrxvWVBxnjRhOCU6XoPpFsiR/Cc4H55fgtH/aoYhW/vGwArR1E6iz4bmECTRPj6+lJdTx74nWYIkhi2tTPAZ0ThFjJpZQUDLiCcdf3xntivWNI1KroclwVjfDUX3rMvI079aiB3IoZstqF+XmhHrRQit9a2KTXvwEJPQdpskTaPDKlDOmFzbe/qjsQDF3IrPkylTSDRlyKdJqnEmlwjcI+ntsb4oG9S/pKi1CbUHIpOBdcJSPf2klxVhr2sN4gwhdKFvkjF2nXnEN9S+QOpRnhqOokJncLgU/bnWSoMrT8ALlj8p0mUyoFPKuhshUFZDC6O5Rrph02hq38GzxiL8UtpCLjPH7FOFnNDX1BwkP15JqitljJeQiaPyH2IA9UY9qb6zwvvRyojhTescjqqY/b4Ggr6fceVhnyVTEseshDUs3cduUGaCKNrUhOT7cU8TZglehQCFvK3eKALzazs7c+ub8d15btQ8F+amb4cU9O8ELK5F7MQXF2prBnRxyBxVWuDCWtbKkgf5mxsYuixZJgt7fJwUBSwlRK/Sb/1Qj8A8r+r8UHXh0LVcNc/1lSrJKhXbmF8sRepcOaZ0iYf1YY7UoPMduSBBLZIFVKuOjwxBUp39kxwkuRf65Hsd3BYUAfTkCfqZtx30ZSnmYk2DF84e7pWXMWbXNGpN6uJA5ctb3lwZtRM10owSTFkm0owHeXOPnszhFQZjhFwFJr0le0PuVEshz+bjp76U+nZBMUcRuyfY0XtDrVMVPEOOdiuV5m0Y/oBB5uKms733ywi87Gd5xx30ZsWVs4L/WdDYRmyWa60TJkxEStmiK1+A+U0TQdLiK2Ls3Op4SZWDB+DNMm5kOAS7MRnNpIidR/R5VTFEWbGkMKeeXgYUIPQQDgVT2uI8zkNO4bPlFeWmOwvwuZ/owwtVUXbkAqjCiGpMX0tSr9rULaMOfobUJ3icmAjGExRcgleECMl90P6LIaKIVumFTQzcyuUuo7NYdn29veqI19XjmLgfr47H/b6Se0MJvSUc8i8HJVYzCOi79yRW2wphsVJyr5dlpMyHPEXZtNJRtD2SxlyR9jEyvVR+bQjGY4ROUW72H1GMGSmHVpfrNg3lIYQjqFYJ1YAKBLzCIZMMMbYSik668RTViWgGP5kCZLgnKsPcmfUiuJ0CIY+tcAUflD+C9TaVSRjzsAwXEAqKXXSDvZ6P1gN9ms7e9ywYBYRDB+GVM8orPMs2KSrrAgcw3FqBgNIxkxd+dNx5myTei9iGDILC6kRmX4pmJ9yhqmslA3D7Of66YNvBb9TzpCJRmTclGtztfAtZegT4fnjD5mQGy0FTaLc8xiGzDxXWgVpUPe9KFZeynAvFoOqBIlYVa0KJWEYPiyv6wWZ1feooCnwbcsYHoVnL4iHC3FtT/FLKIZbi64E9Wc4fDblBWZeGcMXoTSraG8IdbkKPwzF8AuxsTgmmG1bwpDnTFQFDhTcZ3Ll+R8UQy4cMUWnj1SNFYneEobMUiz3H59ZtECerUYxZAoOFVOZsxkvCKIVM6Tpfbdnl8f4lkzoSl8piiELgcSYHNgKYyAUMxzwKE65LdxnmWSprEcxfKDK18JYpu9XhoVBgWKGbFpQ0puVHEjVE44hVRcW5qwJVYeFRRyFDLmqQJW4Fme5cAxphibAVJ5QKWEWvY5ChiyngUy7sdyDbBfhGO6vzyNPV2eQXBnK065XFDKk+reHPCDMwkIyGwPHkIY/Ue+UbqJCd7KQIc/q4Ex9JuvJd/6POIbUaUfI7gffvD5fYfFBEUNmFBG7fLgLaDM+V1I8h2NIDQeiSCSJYHZ6oTFSxJApJ9SmOGPNIp55FYxjyAxchNkWYYy2QoZs0VnYzPOeqeD8ssYxDDtlyPxRpLd2+jV6SkRiIFRlWJ7NbM7wiRq2qkxDDtyMyhvf/5U5VP/aX2TI9mGA34dqd6ZNhvVl6fV5USbUGd3KUp/GawvLN3D6EKGcLl9gzWk70YfMIqlv03zf0qZBMKTlXDewS63GdimqDJMmDwsrxZC+BS7Jn2jwLa47GWVGHa6i25EWXV5RyFCoGMT5h9TJb+4fmkUPTUFNqMLi6RIfn25EnI9PJSnR4ONjFJSGOA0vUUPEaXjxkYY4DcqM0hJrow+NqKJnQR354RgUQ564wMTaWH13g3jpmsVL47LQ0A3ipd3GvMUzuF3FvPmMN8lbsDBvcXsu4QBnd3kLlnuS6V+KMoY8QthzC3NPLI3qKcoicLmnq3QkrvozArrLH4pHfwzFhkUxpHV4KHWoKwfsiDngpTwHLJzCI0GHOeB/L4/fxwhHAW3UYnjmuRaDTtOlFkNsYOt2W4vB/LsCmwtXT9MT4fB6GidTjek1rae5Sg5VtXsOa001Uc9pipeaKMuwLO01UVT6o08Ea6xrkxSW5tsTdF/XxmsTlbsDXZuI6CfRuDaR7Xh0bWJE3RkN9aWkpKWEZzrFj1WhvpQE6HMD7Csd1AjvSwIriBph+hLxNcIscKJu/8IZouq8lfxeSoMAYak2r1PnjajVZ2cEEEfGnta5bvkn2AasEa0CWK2+kmGdWn1m5xFD63kLxu583mI5QD3Qc9lphIgmPCs1HliULcKxcY1ro8/MHOdbfmbme/uGPWmGPzNjVTmNzARYO+eeKnwFf+5JcdhVhe/Ss2usMU+7/acRZ9eukpT0Kv0wW6al5w+DdvtEblmxtObzh6zohzjyDzCG2s6QSiGc2ZNb1UJWp+KJchbUVUSvhryLUZt3FrR3Dpif5VYIyzd+lht9Fqc6Iu6GKM5yb5gyrNq4gh8xlu9w4VArOpldHfjz+DVa09FKMdXySIR4YVt3MvHYuSptxuwZdGULh1Bg2F1fjAyEg7PyRVixCjID3ttE6jkLUs5tq7cJX6Oq3ibMz6vR20Ts4FPSn6Yk518XYpehVvrT8J0mf0GTlnsMiQQVPYZemvUY+kt9ouTtU9gqq311CasTJdKecJleX3r3YrrXVywNBLAz9ZiqUinK+7X1RIo7jf3adqm2e/JdpqFfW8Wee7aui/yiQbpjqLzn3ozFDer33BPEqXwQf5cKXZM4WOnomxik+yYqmq/z19ugbyLPVuN7X+6b9b58zPW+7MnXD8+tosvnZOBmkyf35fX2L31+gezFgKoutLr6lwqmr7y/58n0zUfRHEO4+rcCjFwPWlfZk4V3+m/YiMsnjIC6j3COoj7YsaqPMPsEaSje+HJ31b2gWyNo7ORjToS+YI3jRKxxn/JCiZb6eXsF/bwTtm4sXOa+CEKLS3VPdllMuymIESt7srNVU70RnfTx2aCFffX1ciQFffWFbkR6YpmC5aLWrZMf0Ho3AjwX3I3APic3RCpDuN9C4cVccL3fwu01bdGOv9+CaLrfItWCsviOkvnw3FrdNMw6MEzLOuvR4Rx5R4mqjKoGvvi6aPWemQHmnhnetF2nTzo02NIz6kREtMEX7wpqriiEH04cz7uSjG963xMj6AVlq6ka/uKdXZqjtML1Nb1b3bvmD9lDuNW6JKIghizizW3uzhPjly2kLfn9h+5/8/7DdOsu8wZ3WAp3exTWiTWAEOFzO7pAmmEkdgdr78JcgaJHWonkqzAXA5ddXZfb4X3AD53dB5yhGCs8cN2YJLFgzbd7p/PN7+VuT8hwrNKhfFWcQRtOal7wrQm0WRdxRep2GdfU1e1agUcwXLZEvdpJpmoYiVHbk0wdtrcbJ+kgl9OVipqk44cW8rhvdYzj1EBG0lZJRA7+MLUZCSwb5EaUeNqlo5Rw6NIazrTPteFT06WnDP1Nmp/dhYxJPYCXjnQHcNC5hI6HdLLAMzx9+VckopSdcZKqFhx0yYHRMHVm6HKbZffOzLmXeOYmPwdeNAhzP8yVvpvdKIk8ZsNswsKG3qqZ7pis7Cw/Gw5tFngWI3SzCVtinCay7oqKTtOXyw7EvXZtirJnWuSStqfFGg/D6m99Fg7jfC4ygMUtIiYipgewuRn3+38kgPjz64h/NP84/owhd6bttEDXnSn5Apw0cz4nQ5wY3OF4hGj50x8PexBL7k8gsGvDkqiD8EOWd3JJYAAst1/hVL5mo2n4td0BGPnJuyz25Y0kqBRhokrnE/Nyde7usF+s3l7DM17nq8X+sLwUJwTSlJznOZD8JX5nPH6CqUySkp7tWEKBRmwEqls9ft8KbG4qQBU47uGkH5tf8EwA9rqtXF2Yjb/ZRIpM8fd2u7YJHwXp0T+A48ID0651FbnXsy1wF51b2NUxWuykwr8YxI5h9/NXV2cO0/HGBLCxLM/KM9h8/QXlXgHRaPV5EZrFNC86E9arsuz2X8U0HAy9y73wVhA4bE6JbQfnC1lOf3EPg/Afm7s8/MnjfPV+2CTL4KoOg2WyObyv5o+TW/i1bcKPfnFrb+GOO+6444477rjjjjvuuOOO/0P8DzkiAeijiKXbAAAAAElFTkSuQmCC" alt="" /></h1>
            <p className="text-sm text-center">
              Login to see photos & videos from your friends
            </p>
          </div>
          <div className="flex flex-col">
            <span className="font-medium">Name</span>
            <input
              type="name"
              placeholder="Enter your name"
              name="name"
              value={input.name}
              onChange={handlechange}
              className=" border p-2 border-black focus-visible:ring-transparent my-2"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-medium">Username</span>
            <input
              type="username"
              placeholder="Enter your username"
              name="username"
              value={input.username}
              onChange={handlechange}
              className=" border p-2 border-black focus-visible:ring-transparent my-2"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-medium">Email</span>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={input.email}
              onChange={handlechange}
              className="border p-2 border-black focus-visible:ring-transparent my-2"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-medium">Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={input.password}
              onChange={handlechange}
              className=" border p-2 border-black focus-visible:ring-transparent my-2"
            />
          </div>

          {loading ? (
            <button>Please wait</button>
          ) : (
            <button onClick={postdata} className="bg-pink-700 text-white p-3 hover:bg-pink-900"> sign up</button>
          )}

          <span className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Signin
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Register;
