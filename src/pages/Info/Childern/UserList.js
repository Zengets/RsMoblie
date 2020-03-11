import React from "react";
import { StyleSheet, Linking, TouchableOpacity } from "react-native";
import { LargeList } from "react-native-largelist-v3";
import { SafeAreaViewPlus, HideToast, OneToast, Header, Atoz, TitleSearch, UserItem } from '../../../components';
import { ConvertPinyin } from '../../../utils';
import { contacts } from './mock';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View, Colors, Avatar, Card } from "react-native-ui-lib";


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  section: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

});

let getPinyin = () => {
  var ch_big = 'A';
  var str_big = [];
  for (var i = 0; i < 26; i++) {
    str_big.push(String.fromCharCode(ch_big.charCodeAt(0) + i))
    if (i == 25) {
      str_big.push("#")
    }
  }
  return str_big;
}


@connect(({ index, loading }) => ({
  index,
  submitting: loading.effects['index/userlist'],
}))
class UserList extends React.Component {
  _scrollView = null;
  constructor(props) {
    super(props);
    this.state = {
      pinyin: [],
      isSpin: true,
      cur: "A",
      contacts: contacts,
      keyword: "",
      postUrl: "userlist",
      postData: {
        "accountName": "",   //---------用户名
        "departmentId": "",   //--------部门id
        "groupId": "",    //-------分组id
        "jobTitle": "",   //--------职责
        "parentName": "",   //-------直属领导姓名
        "shopId": "",   //-------车间id
        "userName": ""  //--------姓名
      }
    }
  }

  //设置新状态
  setNewState(type, values, fn) {
    const { dispatch } = this.props;
    dispatch({
      type: 'index/' + type,
      payload: values
    }).then((res) => {
      if (!res) {
        return
      }
      fn ? fn() : null
    })
  }


  resetData = (yuan) => {
    let { index: { done, formdata } } = yuan
    function getVal(key) {
      let one = {};
      formdata.map((item) => {
        if (item.key == key) {
          one = item
        }
      });
      if (one.type.indexOf("select") == -1 ) {
        return one.value && one.value
      } else {
        return one.value && one.value.id
      }
    }
    if (done == "1" && formdata.length > 0) {
      this.setState({
        postData: {
          "accountName": getVal("accountName"),   //---------用户名
          "departmentId": getVal("departmentId"),   //--------部门id
          "groupId": getVal("groupId"),    //-------分组id
          "jobTitle": getVal("jobTitle"),   //--------职责
          "parentName": getVal("parentName"),   //-------直属领导姓名
          "shopId": getVal("shopId"),   //-------车间id
          "userName": getVal("userName")  //--------姓名
        },
      }, () => {
        this.getData()
      })
    } else {
      this.getData()
    }

  }

  UNSAFE_componentWillReceiveProps(np) {
    if (this.props.index.done !== np.index.done) {
      np.index.done=="1"?
      this.resetData(np):
      null
    }
  }


  componentDidMount() {
    this.resetData(this.props)
  }
  //获取数据整理格式
  getData() {
    this.setState({
      isSpin: true
    })
    let { postData, postUrl } = this.state;

    this.setNewState(postUrl, postData, () => {
      this.setNewState("done", "0", () => {
        let newdata = [],
          res = this.props.index.userlist,
          postdata = res.map((item, i) => {
            item.header = ConvertPinyin(item.userName).substring(0, 1).toUpperCase();
            return item
          }),
          letterarr = getPinyin();
        letterarr.map((item, i) => {
          let items = [], itemz = [];
          postdata.map((list, index) => {
            if (item == list.header) {
              items.push(list)
            } else if (letterarr.indexOf(list.header) == -1) {
              itemz.push(list)
            }
          })
          let curitem = {
            header: item,
            items: item == "#" ? itemz : items
          }
          curitem.items.length == 0 ? null : newdata.push(curitem);
        })
        this.setState({
          contacts: newdata,
          pinyin: newdata.map((item) => {
            return item.header
          }),
          isSpin: false
        })


      })





    })
  }


  _renderSection = (section) => {
    return (
      <View row spread style={styles.section}>
        <Text style={{ paddingLeft: 32 }}>
          {this.state.contacts[section].header}
        </Text>

      </View>
    );
  };

  _renderIndexPath = ({ section: section, row: row }) => {
    let item = this.state.contacts[section].items[row],
      avatar = {
        title: 'Initials with Color',
        imageSource: require("../../../assets/user.png"),
      }
    return (
      <View>
        <UserItem key={section + "" + row} avatar={avatar} item={item} navigation={this.props.navigation}></UserItem>
      </View>
    );
  };

  changetodo = (index) => {
    var zm = getPinyin();
    this._scrollView.scrollToIndexPath({ section: index, row: 0 }, false);
  }


  changeData = (key, value) => {
    let { index: { formdata } } = this.props;
    let newformdata = formdata.map((item, i) => {
      if (item.key == key) {
        item.value = value
      } else {
      }
      return item
    })
    this.setNewState("formdata", newformdata)
  }


  render() {
    let { cur, contacts, isSpin, postData, pinyin } = this.state,
      { navigation, submitting, index: { res, formdata }, } = this.props,
      searchprops = {
        navigation,
        placeholder: "输入姓名查询...",
        value: postData.userName,
        onChangeText: (val, ifs) => {
          this.setState({
            postData: {
              ...postData,
              userName: val
            }
          }, () => {
            this.changeData("userName", val)
            if (ifs) {
              this.getData()
            }
          })
        },
        onSubmitEditing: () => {
          this.getData()
        },
        handleFormData: (fn) => {
          let formdatas = [{
            key: "userName",
            type: "input",
            require: false,
            value: postData.userName,
            hidden: false,
            placeholder: "请输入姓名"
          }, {
            key: "accountName",
            type: "input",
            require: false,
            value: postData.accountName,
            hidden: false,
            placeholder: "请输入用户名(账号)"
          }, {
            key: "jobTitle",
            type: "input",
            require: false,
            value: postData.jobTitle,
            hidden: false,
            placeholder: "请输入职责"
          }, {
            key: "parentName",
            type: "input",
            require: false,
            value: postData.parentName,
            placeholder: "直属领导姓名"
          }, {
            key: "shopId",
            type: "select",
            require: false,
            value: postData.shopId,
            placeholder: "请选择车间",
            linked:{
              key:"groupId",
              posturl:"getshoplist",
              format:{dicKey:"id",dicName:"groupName"},
              postkey:"shopId"
            },
            option: res.shopList && res.shopList.map((item, i) => {
              return {
                dicName: item.shopName,
                dicKey: item.id
              }
            })
          }, {
            key: "groupId",
            type: "select",
            require: false,
            value: postData.groupId,
            placeholder: "请选择分组",
            option: []
          }, {
            key: "departmentId",
            type: "treeselect",
            require: false,
            value: postData.departmentId,
            placeholder: "请选择部门",
            option: res.departmentDataList
          }
          ]
          this.setNewState("formdata", formdata.length > 0 ? formdata : formdatas, () => {
            fn ? fn() : null
          })
        }
      }




    return (
      <SafeAreaViewPlus loading={submitting}>
        <Header title="用户列表" navigation={navigation}>
        </Header>
        <View padding-12 style={{ paddingBottom: 0 }}>
          <TitleSearch {...searchprops}></TitleSearch>
        </View>
        <View style={{ position: "relative", flex: 1, marginTop: -3 }} row center>
          <LargeList
            ref={ref => (this._scrollView = ref)}
            style={styles.container}
            data={contacts}
            heightForSection={() => 30}
            renderSection={this._renderSection}
            heightForIndexPath={() => 77}
            renderIndexPath={this._renderIndexPath}
            renderHeader={null}
            renderFooter={null}
          />
          {
            pinyin.length > 0 && <Atoz changetodo={this.changetodo} pinyin={pinyin}>
            </Atoz>
          }



        </View>
      </SafeAreaViewPlus>
    );
  }
}
export default UserList

