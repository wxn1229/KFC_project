
import React, { useState, useEffect } from 'react';
import "./Menuleft.css"
import "./Counter.css"
import ItemService from './services/ItemService';
import listService from './services/listService';
import authService from './services/authService';


// A functional component for a menu item
const MenuItem = ({ title, name, number, isCanChange, image, count, group, changePage, setChangePage, changeGroup, setChangeGroup, list, setList, curCount, setCurCount, maxCount, setMaxCount, totalCount, setTotalCount, preList, setPreList, newitemcontent, setNewitemcontent }) => {
  const changeHandler = (event) => {
    setPreList(list)
    let tmplist = list
    tmplist[group] = []
    setList(tmplist)
    setTotalCount(0)
    setMaxCount(number * count)
    setChangePage((!changePage))
    setChangeGroup(group)

  }



  useEffect(() => {
    let itemcontentObj = {
      ...newitemcontent.reduce((obj, item) => {
        obj[item.itemname] = { ...item }; // 複製物件以避免直接修改 state
        return obj;
      }, {})
    };

    if (Array.isArray(list[group])) {
      list[group].forEach((item) => {
        // 如果 itemcontentObj 已有該 itemname，則更新 itemnum
        if (itemcontentObj.hasOwnProperty(item.itemname)) {
          itemcontentObj[item.itemname].itemnum += ((count - curCount) * number);
        } else {
          // 如果沒有，則新增該項目
          itemcontentObj[item.itemname] = {
            itemname: item.itemname,
            itemnum: item.num + ((count - curCount) * number)
          };
        }
      });
    } else {
      if (itemcontentObj.hasOwnProperty(name)) {
        itemcontentObj[name].itemnum += ((count - curCount) * number);
      } else {
        itemcontentObj[name] = { itemname: name, itemnum: number * count };
      }
    }

    let itemcontent = Object.values(itemcontentObj);

    setNewitemcontent(itemcontent);
    console.log({ msg: "newitemcontent", itemcontent });

  }, [count]);



  return (

    <div className="menu-item">

      <img src={"/img/food/" + image} alt={name} className="menu-item-image" />
      <div className="menu-item-content">
        <div className="menu-item-header">{title}</div>
        {!Array.isArray(list[group]) && <div className="menu-item-name">{name} x{number * count}</div>
        }
        {Array.isArray(list[group]) && list[group].map((item, index) => {
          if (index === 0) {
            // Render something special for the first item
            return <div key={index} className="menu-item-name">{item.itemname} x{item.num + ((count - curCount) * number)} </div>;
          } else {
            // Render the standard item for other indices
            return <div key={index} className="menu-item-name">{item.itemname} x{item.num}</div>;
          }
        })}
        {isCanChange && <button group={group} onClick={changeHandler} className="change-button">更換</button>}
      </div>
    </div>
  );
};


const Menuchange = ({ name, image, price, group, changePage, setChangePage, list, setList, changeGroup, count, totalCount, setTotalCount, maxCount, setMaxCount, curPrice, addPrice, setAddPrice, preList, setPreList }) => {
  const [itemcount, setItemcount] = useState(0)
  const [preCount, setPreCount] = useState(0)
  useEffect(() => {
    setPreCount(itemcount)



    setTotalCount(totalCount + itemcount - preCount)
    console.log(preList[group])
  }, [itemcount])



  useEffect(() => {
    // 检查 changeGroup 是否存在于 list 中，如果不存在则初始化为空数组
    const groupItems = list[changeGroup] || [];

    // 检查是否已经存在相同的 itemname
    const itemIndex = groupItems.findIndex(item => item.itemname === name);

    let updatedGroupItems;
    if (itemcount === 0) {
      // 如果 num 为 0 并且找到相同的 itemname，则删除该项
      if (itemIndex !== -1) {
        updatedGroupItems = groupItems.filter((_, index) => index !== itemIndex);
      } else {
        // 如果没有找到，保持原样
        updatedGroupItems = [...groupItems];
      }
    } else {
      // 如果 num 不为 0
      if (itemIndex !== -1) {
        // 如果找到相同的 itemname，则替换该项
        updatedGroupItems = groupItems.map((item, index) =>
          index === itemIndex ? { itemname: name, num: itemcount, priceDiff: price - curPrice } : item
        );
      } else {
        // 如果没有找到，则添加新项
        updatedGroupItems = [...groupItems, { itemname: name, num: itemcount }];
      }
    }

    // 使用新对象来更新状态
    const updatedList = {
      ...list,
      [changeGroup]: updatedGroupItems
    };

    setList(updatedList);
    console.log(list)
  }, [changeGroup, itemcount]);



  const decrementCount = () => {
    if (itemcount > 0) {
      setItemcount(itemcount - 1);
    }
  };

  const incrementCount = () => {
    if (totalCount !== maxCount) {

      setItemcount(itemcount + 1);
    }
  };


  return (

    <div className="menu-item">

      <img src={"/img/food/" + image} alt={name} className="menu-item-image" />
      <div className="menu-item-content">
        <div className="menu-item-name">{name} {(curPrice - price) !== 0 && `+`}{(curPrice - price) !== 0 && ((-curPrice + price)) + "$"}</div>
        <div className="footer">
          <div className="counter">
            <button onClick={decrementCount}>-</button>
            <span>{itemcount}</span>
            <button onClick={incrementCount}>+</button>
          </div>

        </div>

      </div>
    </div>
  );
};
// The Menu component that would render all the menu items
const Menuleft = ({ count, setCount, menuItems, addPrice, setAddPrice, bonus, setBonus, combo }) => {
  const [changePage, setChangePage] = useState(false)
  const [changeGroup, setChangeGroup] = useState('ff')
  const [groups, setGroups] = useState({})
  const [list, setList] = useState({})
  const [preList, setPreList] = useState({})

  const [curCount, setCurCount] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [maxCount, setMaxCount] = useState(0)
  const [curPrice, setCurPrice] = useState(0)
  const [newitemcontent, setNewitemcontent] = useState([])



  useEffect(() => {
    const fetchData = async () => {
      try {
        let foundGroups = await ItemService.getItembyGroup(changeGroup)
        console.log({ msg: "foundGroups", found: foundGroups.data })


        setGroups(foundGroups.data.foundItems)
        setCurPrice(foundGroups.data.foundItems[0].price)
      } catch (e) {
        console.log({ msg: "found Groups error", error: e })

      }

    }

    fetchData()

  }, [changeGroup])

  const addHandler = () => {

    console.log("click join")
    for (const key in list) {
      if (list.hasOwnProperty(key)) {
        const items = list[key];
        if (Array.isArray(items)) {
          items.forEach(item => {
            console.log({ msg: "check item", item });
            console.log({ msg: "check item.priceDiff * num", result: item.priceDiff * item.num });
          });
        }
      }
    }
    try {

      // let newitem = { title: combo.comboname, itemprice: combo.price * count + bonus, }
      //let updatelist = await listService.addproduct(authService.getCurUser()._id,)

    } catch (e) {
      console.log(e.response.data)

    }

  }
  //console.log({ msg: "this is left items", object: menuItems })
  const checkHandler = () => {
    console.log({ msg: "this is list", list })



    if (totalCount === maxCount) {
      let totalBonus = bonus; // Start with the current bonus

      for (const key in list) {
        if (list.hasOwnProperty(key)) {
          const items = list[key];
          if (Array.isArray(items)) {
            items.forEach(item => {
              console.log({ msg: "check item", item });
              console.log({ msg: "check item.priceDiff * num", result: item.priceDiff * item.num });

              totalBonus += (item.num * (item.priceDiff || 0)); // Safely add to totalBonus

              console.log({ msg: "check running totalBonus", result: totalBonus });
            });
          }
        }
      }


      setBonus(totalBonus); // Update the state only once
      console.log({ msg: "final totalBonus", result: totalBonus });
      setCurCount(count);
      setChangePage(!changePage);
      console.log(changePage);
    }
    else if (totalCount < maxCount) {
      alert("目前只選擇了" + totalCount + "項,請再選擇" + (maxCount - totalCount) + "項,總共需要" + maxCount + "項品項")
    }

  }


  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div className="Menuleft">
      {!changePage && menuItems.map((item, index) => (
        < MenuItem
          key={index}
          title={item.title}
          name={item.name}
          number={item.number}
          isCanChange={item.isCanChange}
          image={item.image}
          count={count}
          group={item.group}
          changePage={changePage}
          setChangePage={setChangePage}
          changeGroup={changeGroup}
          setChangeGroup={setChangeGroup}
          list={list}
          setList={setList}
          curCount={curCount}
          setCurCount={setCurCount}
          maxCount={maxCount}
          setMaxCount={setMaxCount}
          totalCount={totalCount}
          setTotalCount={setTotalCount}
          preList={preList}
          setPreList={setPreList}
          newitemcontent={newitemcontent}
          setNewitemcontent={setNewitemcontent}

        />
      ))}

      {!changePage &&
        <div className="footer">
          <div className="counter">
            <button onClick={decrementCount}>-</button>
            <span>{count}</span>
            <button onClick={incrementCount}>+</button>
          </div>
          <div className="addcartblock">
            <button onClick={addHandler} className="add-to-cart-button">加入購物車</button>
          </div>


        </div>
      }
      {changePage &&
        <h1>更改品項</h1>
      }
      {changePage && groups.map((item, index) => (
        < Menuchange
          key={index}
          name={item.itemname}
          image={item.imgpath}
          price={item.price}
          group={item.group}
          changePage={changePage}
          setChangePage={setChangePage}
          list={list}
          setList={setList}
          changeGroup={changeGroup}
          count={count}
          totalCount={totalCount}
          setTotalCount={setTotalCount}
          maxCount={maxCount}
          setMaxCount={setMaxCount}
          curPrice={curPrice}
          addPrice={addPrice}
          setAddPrice={setAddPrice}
          preList={preList}
          setPreList={setPreList}





        />
      ))}
      {changePage && <h3>總共需要 {maxCount} 個品項</h3>}

      {changePage &&
        <div className="addcartblock">
          <button onClick={checkHandler} className="add-to-cart-button">確認</button>
        </div>
      }


    </div>
  );
};

export default Menuleft;
