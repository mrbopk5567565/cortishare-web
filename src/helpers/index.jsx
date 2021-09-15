import moment from "moment";

// =============== format number =========================
export const numberWithCommas = (x, decimals) => {
  return number_format(x, decimals ?? 2, '.', ',');
};

function number_format(number, decimals, dec_point, thousands_sep) {
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
    dec = typeof dec_point === 'undefined' ? '.' : dec_point,
    toFixedFix = function (n2, prec2) {
      // Fix for IE parseFloat(0.55).toFixed(0) = 0;
      var k = Math.pow(10, prec2);
      return Math.round(n2 * k) / k;
    },
    s = (prec ? toFixedFix(n, prec) : Math.round(n)).toString().split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

export const checkLongString = (str, limitLength = 20, keepLength = 7) => {
  if (!str) return ''
  if (str.length >= limitLength)
    return str.substring(0, keepLength) + '...'
  else
    return str
}

export const formatArrayBreadCrumb = (data) => {
  if (data.length) {
    let newData = []
    data.slice(-3).forEach((item, idx) => {
      let label = ''
      let link = ''
      if (idx === 0) {
        if (data.length === 1) {
          label = checkLongString(item.label, 20, 20)
          link = `/board/${item.id}`
        } else if (data.length > 3) {
          label = '...'
          link = `/board/${data[0].id}/node/${item.id}`
        } else {
          // label = item.label
          label = checkLongString(item.label, 20, 17)
          link = `/board/${item.id}`
        }
      } else {
        // label = item.label
        label = checkLongString(item.label, 40, 40)
        if (item.type !== "Post")
          link = `/board/${data[0].id}/node/${item.id}`
        else
          link = `/post/${item.id}`
      }
      newData.push({
        label: label,
        link: link
      })
    })
    return newData
  } else
    return []
}

export const formatStringBreadCrumb = (data) => {
  if (data.length) {
    let newData = ''
    data.slice(-3).forEach((item, idx) => {
      if (idx === 0) {
        if (data.length > 3)
          newData += '...'
        else
          newData += checkLongString(item.label)
      } else {
        newData += `/${checkLongString(item.label)}`
      }
    })
    return newData
  } else
    return ''
}


export const isAuthentication = (id) => {
  let customer = JSON.parse(localStorage.getItem('customer'))
  if (customer.customerId == id) {
    return true
  } else {
    return false
  }
}

export const formatNodeData = (nodeData) => {
  let copyNodeData = nodeData
  const mapRootNode = nodeData.mapId
  const getArrayFlatFormat = (node, preNode = undefined) => {
    if (node) {
      if (node.mapId) {
        if (node.mapId !== mapRootNode) {
          node.belongOtherMap = true
          if (!preNode || preNode.mapId === mapRootNode)
            node.firstNodeOtherMap = true
          else
            node.firstNodeOtherMap = false
        }
        else
          node.belongOtherMap = false
      }

      // node.belongOtherMap = (node.mapId && node.mapId!==mapRootNode)  ? true : false
      // node.firstNodeOtherMap = (node.mapId && node.mapId!==mapRootNode) &
      if (node.children && node.children.length) {
        for (let idx = 0; idx < node.children.length; idx++) {
          getArrayFlatFormat(node.children[idx], node)
        }
      }
    }
    else
      return
  }
  getArrayFlatFormat(copyNodeData)
  return copyNodeData
}

export const omitNodeOtherMap = (nodeData, parent) => {
  let copyNodeData = nodeData
  const mapRootNode = nodeData.mapId
  const loopOmit = (node, parent) => {
    if (!node)
      return
    if (node.mapId !== mapRootNode) {
      parent.children = parent.children.filter(item => item.id !== node.id)
      return
    }
    else {
      if (node.children && node.children.length) {
        for (let idx = 0; idx < node.children.length; idx++) {
          loopOmit(node.children[idx], node)
        }
      }
    }
  }

  loopOmit(copyNodeData)
  return copyNodeData
}


export const validateError = ({ name, value, maximum, minximum, password, isValidatePassword, isValidateUserName }) => {
  if (isValidatePassword) {
    if (name === "password") {
      // check contain number
      let regexContianerLeter = /[a-z]/i;
      let regexUpperText = /[A-Z]/;
      let regexNumber = /[0-9]/;

      if (!regexContianerLeter.test(value)) return 'Your password must contain at least one letter';
      if (!regexUpperText.test(value)) return 'Your password must contain at least one letter uppercase';
      if (!regexNumber.test(value)) return 'Your password must contain at least one digit';
    }

    if (name == "confirmPassword") {
      return value === password || "The passwords do not match";
    }
  }

  if (maximum && minximum && (value.length > maximum || value.length < minximum)) {
    return `Your ${name} input must be between ${minximum}-${maximum} characters`
  }

  if (maximum && value.length > maximum) {
    return `Your ${name} must be less than ${maximum} characters long`
  }

  if (minximum && value.length < minximum) {
    return `Your ${name} must be more than ${minximum} characters long`
  }
  if (name === "username" && isValidateUserName) {
    let userName = /^[a-zA-Z0-9]+$/;
    if (!userName.test(value)) return `Your ${name} should not contain special characters`;
  }

  return true;
}

//  O: free, 
//  1: paymented, 
//  2: expired, 
//  3: cancel
//  4: cancel-free 
export const checkPaymentStatus = ({ customer, payment }) => {
  var checkPlan = 0;
  if (customer.currentPlanId == 0) {
    checkPlan = 0;
  }
  if (payment && payment.isPayment) {
    checkPlan = 1;
  }
  if (payment && !payment.isPayment && !payment.isCancelled) {
    checkPlan = 2;
  }
  if (payment && payment.isCancelled) {
    checkPlan = 3;
    //check plan còn ngày sử dụng
    let current = moment().format();
    if (payment.isPayment && payment.expiredDatetime >= current) {
      checkPlan = 3
    } else {
      checkPlan = 4
    }
  }
  return checkPlan;
}

export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

export const validateUpload = (fields) => {
  let errors = [];
  if(fields.length == 1 ) {
     validateSize(fields, errors)
  } else {
    for (var i = 0; i < fields.length; i++) {
      validateSize(fields, errors)
    }
  }
  return {errors};
}

const validateSize = (file, errors) => {
  let maxSize = null;
  if(file[0]?.type.includes('image/')) {
    maxSize = 2048; 
  }else {
    maxSize = 4096;
  }
  if ((file[0]?.size/1024) > maxSize) {
      errors.push(file[0]?.name || file?.name)
      return false;
  } else {
    return true;
  }
}

export const urlify = (text) => {
  // var urlRegex = /(https?:\/\/[^\s]+)/g;
  var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  return text.replace(urlRegex, function(url) {
    console.log('urlurlurl', url)
    return '<a target="_blank" href="' + url + '">' + url + '</a>';
  })
  // or alternatively
  // return text.replace(urlRegex, '<a href="$1">$1</a>')
}

// export const isLoggedIn = () => {
//   let customer = !['null', null, ''].includes(localStorage.getItem('customer'));
//   return Boolean(localStorage.getItem('accessToken') && customer)
// }

let customer = !['null', null, ''].includes(localStorage.getItem('customer'));

export const isLoggedIn = Boolean(localStorage.getItem('accessToken') && customer)