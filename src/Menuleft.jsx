
import React, { useState, useEffect } from 'react';
import "./Menuleft.css"
import "./Counter.css"
import ItemService from './services/ItemService';


// A functional component for a menu item
const MenuItem = ({ title, name, number, isCanChange, image, count, group, changePage, setChangePage, changeGroup, setChangeGroup, list }) => {
  const changeHandler = (event) => {
    setChangePage((!changePage))
    setChangeGroup(group)

  }


  useEffect(() => {
    console.log({ msg: "MenuItem group ", group: group })
    console.log({ msg: "MenuItem list", list: list[group] })

  }, [])


  return (

    <div className="menu-item">

      <img src={"/img/food/" + image} alt={name} className="menu-item-image" />
      <div className="menu-item-content">
        <div className="menu-item-header">{title}</div>
        {typeof list[group] == "undefined" && <div className="menu-item-name">{name} x{number * count}</div>
        }
        {!(typeof (list[group]) == 'undefined') && list[group].forEach((item, index) => (

          <div className="menu-item-name listgroup">{item.itemname} x{item.num * count}</div>
        ))}

        {isCanChange && <button group={group} onClick={changeHandler} className="change-button">更換</button>}
      </div>
    </div>
  );
};

const Menuchange = ({ name, image, changePage, setChangePage, list, setList, changeGroup }) => {
  const [itemcount, setItemcount] = useState(0)



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
          index === itemIndex ? { itemname: name, num: itemcount } : item
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
  }, [changePage, changeGroup, itemcount]);



  const decrementCount = () => {
    if (itemcount > 0) {
      setItemcount(itemcount - 1);
    }
  };

  const incrementCount = () => {
    setItemcount(itemcount + 1);
  };


  return (

    <div className="menu-item">

      <img src={"/img/food/" + image} alt={name} className="menu-item-image" />
      <div className="menu-item-content">
        <div className="menu-item-name">{name}</div>
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
const Menuleft = ({ count, setCount, menuItems }) => {
  const [changePage, setChangePage] = useState(false)
  const [changeGroup, setChangeGroup] = useState('ff')
  const [groups, setGroups] = useState({})
  const [list, setList] = useState({})


  useEffect(() => {
    const fetchData = async () => {
      try {
        let foundGroups = await ItemService.getItembyGroup(changeGroup)
        console.log({ msg: "foundGroups", found: foundGroups.data })


        setGroups(foundGroups.data.foundItems)
      } catch (e) {
        console.log({ msg: "found Groups error", error: e })

      }

    }

    fetchData()

  }, [changeGroup])

  //console.log({ msg: "this is left items", object: menuItems })
  const checkHandler = () => {


    setChangePage((!changePage))
    console.log(changePage)
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
            <button className="add-to-cart-button">加入購物車</button>
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
          changePage={changePage}
          setChangePage={setChangePage}
          list={list}
          setList={setList}
          changeGroup={changeGroup}


        />
      ))}
      {changePage &&
        <div className="addcartblock">
          <button onClick={checkHandler} className="add-to-cart-button">確認</button>
        </div>
      }


    </div>
  );
};

export default Menuleft;
