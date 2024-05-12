import 'dart:convert';
import 'package:tungipara_school_library/model/author_model.dart';
import 'package:tungipara_school_library/model/books_model.dart';
import 'package:tungipara_school_library/model/dashboard_status.dart';
import 'package:tungipara_school_library/model/fileUploadInfo_model.dart';
import 'package:tungipara_school_library/model/publishers_model.dart';
import 'package:tungipara_school_library/model/school_model.dart';
import 'package:tungipara_school_library/model/subCategory_model.dart';
import 'package:http/http.dart' as http;
import 'package:tungipara_school_library/helper/sharedPreference_helper.dart';
import 'package:tungipara_school_library/model/category_model.dart';
import 'package:tungipara_school_library/model/customer_model.dart';
import 'package:tungipara_school_library/model/dbOrderItemSummary.dart';
import 'package:tungipara_school_library/model/dbOrderSummary.dart';
import 'package:tungipara_school_library/model/emailAccount_model.dart';
import 'package:tungipara_school_library/model/login_response_model.dart';
import 'package:tungipara_school_library/model/manualOrderInfo_model.dart';
import 'package:tungipara_school_library/model/oder_submit_response_model.dart';
import 'package:tungipara_school_library/model/product_model_db.dart';
import 'package:tungipara_school_library/model/save_user_model_response.dart';
import 'package:tungipara_school_library/model/transactionInfo_model.dart';
import 'package:tungipara_school_library/model/unit_model.dart';
import 'package:tungipara_school_library/model/upazila_model.dart';
import 'package:tungipara_school_library/model/update_order_status_by_admin_model.dart';
import 'package:tungipara_school_library/model/uploadData_model.dart';
import 'package:tungipara_school_library/model/userInfo_model.dart';
import 'package:tungipara_school_library/model/userPaymentInfo_model.dart';
import 'package:tungipara_school_library/model/user_search_model.dart';

class NetWorkApiProvider {
  Map<String, String> get headers => {
        "Content-Type": "application/json",
        "Accept": "application/json",
      };
  //var baseurl = 'http://medp.zamzambazar.com/api/';
  var baseurl = 'https://tsl.a2zmanager.com/api/';
  static const getAllCategory = 'OrderDB/GetAllCategory';
  static const getAllProductByCategoryId =
      '/OrderDB/GetProductByCategoryId?categoryId=2';

  Future<LoginResponseModel> userLoginPost({body}) async {
    var response = await http.post(Uri.parse(baseurl + 'Login/Login'),
        body: jsonEncode(body.toJson()), headers: headers);
    //print(response.body.toString());
    //print(body.toJson());
    final reponse = json.decode(response.body);
    //print('aa');
    return LoginResponseModel.fromJson(reponse);
  }

  Future<CategoryModel> getcategoryList() async {
    var isLogin = await SharedPreferencesHelper.getLoginFlag();
    if(isLogin) {
      var token = await SharedPreferencesHelper.getToken();
      var headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'Authorization': "Bearer $token"
      };
      var response = await http.get(Uri.parse(baseurl + 'OrderDB/GetAllCategory'), headers: headers);
      //print(baseurl + getAllCategory);
      final reponse = json.decode(response.body);
      //print(response.body.toString());
      return CategoryModel.fromJson(reponse);
    }
    else{
      var schoolId = await SharedPreferencesHelper.getSchoolId();
      var response = await http.get(Uri.parse(baseurl + 'OrderDB/GetAllCategoryBySchoolId?schoolId=$schoolId'), headers: headers);
      final reponse = json.decode(response.body);
      return CategoryModel.fromJson(reponse);
    }
  }

  Future<SubCategoryModel> getAllSubCategoryListByCategoryId({categoryId}) async {
    var isLogin = await SharedPreferencesHelper.getLoginFlag();
    if(isLogin) {
      var token = await SharedPreferencesHelper.getToken();
      var headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'Authorization': "Bearer $token"
      };
      var response = await http.get(Uri.parse(baseurl + 'OrderDB/GetAllSubCategoryByCategoryId?id=$categoryId'),
          headers: headers);
      final reponse = json.decode(response.body);
      return SubCategoryModel.fromJson(reponse);
    } else {
      var schoolId = await SharedPreferencesHelper.getSchoolId();
      var response = await http.get(Uri.parse(baseurl + 'OrderDB/GetAllSubCategoryByCategoryId?id=$categoryId&schoolId=$schoolId'), headers: headers);
      final reponse = json.decode(response.body);
      return SubCategoryModel.fromJson(reponse);
    }
  }

  Future<UnitModel> getUnitList() async {
    var token = await SharedPreferencesHelper.getToken();
    var headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };
    var response = await http.get(Uri.parse(baseurl + 'Unit/GetAllUnit'), headers: headers);
    //print( Uri.parse(baseurl +  response.body.toString());
    final reponse = json.decode(response.body);
    return UnitModel.fromJson(reponse);
  }

  Future<ProductModel> getAllProductListByCategoryId({categoryId}) async {
    var isLogin = await SharedPreferencesHelper.getLoginFlag();
    if(isLogin) {
      var token = await SharedPreferencesHelper.getToken();
      var headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'Authorization': "Bearer $token"
      };
      var response = await http.get(Uri.parse(baseurl + 'OrderDB/GetProductByCategoryId?categoryId=$categoryId'),
          headers: headers);
      final reponse = json.decode(response.body);
      return ProductModel.fromJson(reponse);
    } else {
      var schoolId = await SharedPreferencesHelper.getSchoolId();
      var response = await http.get(Uri.parse(baseurl + 'OrderDB/GetProductByCategoryIdBySchoolId?categoryId=$categoryId&schoolId=$schoolId'), headers: headers);
      final reponse = json.decode(response.body);
      return ProductModel.fromJson(reponse);
    }
  }

  Future<ProductModel> getAllProductBySearch({query}) async {
    //print(categoryId);
    var response = await http.get(Uri.parse(baseurl + 'Product/GetProductForSearch?Name=$query'),
        headers: headers);
    final reponse = json.decode(response.body);
    return ProductModel.fromJson(reponse);
  }

  Future<ProductModel> getAllPopularProductList() async {
    //print(categoryId);
    //print(Uri.parse(baseurl + 'Product/GetAllPopularProduct');
    var response = await http.get(Uri.parse(baseurl + 'Product/GetAllPopularProduct'));
    final reponse = json.decode(response.body);
    //print(response.toString());
    return ProductModel.fromJson(reponse);
  }

  Future<ProductModel> getAllProductListByCategoryIdForAdmin({categoryId}) async {
    var token = await SharedPreferencesHelper.getToken();
    var headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.get(Uri.parse(baseurl + 'OrderDB/GetProductByCategoryIdForAdmin?categoryId=$categoryId'),
        headers: headers);

    final reponse = json.decode(response.body);
    return ProductModel.fromJson(reponse);
  }

  Future<ProductModel> getAllProductList() async {
    var response = await http.get(Uri.parse(baseurl + 'OrderDB/GetAllProduct'),
        headers: headers);
    final reponse = json.decode(response.body);
    return ProductModel.fromJson(reponse);
  }

  Future<OrderSubmitResponseModel> saveOrderInfo(
      TransactionInfoItem object) async {
    var token = await SharedPreferencesHelper.getToken();
    var headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };
    print(object.toJson());
    var response = await http.post(Uri.parse(baseurl + 'TransactionInfo/SaveTransactionInfo'),
        body: jsonEncode(object.toJson()),
        headers: headers);
    print(response.body.toString());
    final reponse = json.decode(response.body);

    return OrderSubmitResponseModel.fromJson(reponse);
  }

  Future<OrderSubmitResponseModel> saveManualOrderInfo(
      ManualOrderInfoItem object) async {
    //print(object.toJson());
    var token = await SharedPreferencesHelper.getToken();
    var headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };
    var response = await http.post(Uri.parse(baseurl + 'ManualOrderInfo/SaveManualOrderInfo'),
        body: jsonEncode(object.toJson()),
        headers: headers);
    //print(response.toString());
    final reponse = json.decode(response.body);
    return OrderSubmitResponseModel.fromJson(reponse);
  }

  Future<TransactionInfoModel> getAllOrderListUser() async {
    var loginUserId = await SharedPreferencesHelper.getLoginUserId();
    var token = await SharedPreferencesHelper.getToken();
    var headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };
    var response = await http.get(Uri.parse(baseurl + 'TransactionInfo/GetAllTransactionInfoForAudit'),
        headers: headers);
    final reponse = json.decode(response.body);
    return TransactionInfoModel.fromJson(reponse);
  }

  Future<ManualOrderInfoModel> getAllManualOrderListUser() async {
    var loginUserId = await SharedPreferencesHelper.getLoginUserId();
    var token = await SharedPreferencesHelper.getToken();
    var headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };
    var response = await http.get(Uri.parse(baseurl + 'ManualOrderInfo/GetManualOrderInfoByCustomerId?customerId=$loginUserId'),
        headers: headers);
    final reponse = json.decode(response.body);
    return ManualOrderInfoModel.fromJson(reponse);
  }

  Future<CustomerModel> getAllVoluteers() async {
    var userId = await SharedPreferencesHelper.getLoginUserId();
    var token = await SharedPreferencesHelper.getToken();
    print(userId);
    var headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };
    var response = await http.get(Uri.parse(baseurl + 'Customer/GetCustomerByTypeAndUser?id=$userId&type=Volunteer'),
        headers: headers);
    final reponse = json.decode(response.body);
    return CustomerModel.fromJson(reponse);
  }

  Future<TransactionInfoModel> getAllOrderListAdmin({int typeToShowOrder = 1}) async {
    var userId = await SharedPreferencesHelper.getLoginUserId();
    var accountsType = await SharedPreferencesHelper.getAccountsType();

    String url = 'TransactionInfo/GetAllTransactionInfo';
    if(typeToShowOrder == 1){
      url = 'TransactionInfo/GetAllTransactionInfoForAudit';
    }
    var token = await SharedPreferencesHelper.getToken();
    var headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };
    var response = await http.get(Uri.parse(baseurl + url),
        headers: headers);
    //print(response.body.toString());
    final reponse = json.decode(response.body);
    return TransactionInfoModel.fromJson(reponse);
  }

  Future<ManualOrderInfoModel> getAllManualOrderListAdmin({int typeToShowOrder = 1}) async {
    var userId = await SharedPreferencesHelper.getLoginUserId();
    var accountsType = await SharedPreferencesHelper.getAccountsType();

    String url = 'ManualOrderInfo/GetAllManualOrderInfo?id=$userId&userType=$accountsType';
    if(typeToShowOrder == 1){
      url = 'ManualOrderInfo/GetAllManualOrderInfoForAduit?id=$userId&userType=$accountsType';
    }
    var token = await SharedPreferencesHelper.getToken();
    var headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };
    var response = await http.get(Uri.parse(baseurl + url),
        headers: headers);
    final reponse = json.decode(response.body);
    return ManualOrderInfoModel.fromJson(reponse);
  }

  Future<UpdateOrderStatusByAdminModel> updateOrderStatusByAdmin(
      {orderID, status}) async {
    var loginUserId = await SharedPreferencesHelper.getLoginUserId();

    var token = await SharedPreferencesHelper.getToken();
    var headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };
    var response = await http.post(Uri.parse(baseurl + 'TransactionInfo/UpdateOrderStatus?orderId=$orderID&userId=$loginUserId&status=$status'),
        headers: headers);
    final reponse = json.decode(response.body);
    return UpdateOrderStatusByAdminModel.fromJson(reponse);
  }

  Future<UpdateOrderStatusByAdminModel> updateDeliveryPerson(
      {orderID, status, deliveryPersonId}) async {
    var loginUserId = await SharedPreferencesHelper.getLoginUserId();

    var token = await SharedPreferencesHelper.getToken();
    var headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };
    var response = await http.post(Uri.parse(baseurl + 'OrderInfo/UpdateOrderStatus?orderId=$orderID&userId=$loginUserId&status=$status&deliveryPersonId=$deliveryPersonId'),
        headers: headers);
    final reponse = json.decode(response.body);
    return UpdateOrderStatusByAdminModel.fromJson(reponse);
  }

  Future<TransactionInfoModel> getOrderInfoDetails({orderId}) async {
    var token = await SharedPreferencesHelper.getToken();
    var headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };
    var response = await http.get(Uri.parse(baseurl + 'TransactionInfo/GetTransactionInfoById?id=$orderId'),
        headers: headers);
    final reponse = json.decode(response.body);
    //print(response.body.toString());
    return TransactionInfoModel.fromJsonObj(reponse);
  }

  Future<SaveUserModelResponse> saveCustomer(
      {CustomerItem saveCustomer}) async {
    //print(saveCustomer.toJson());
    var response = await http.post(Uri.parse(baseurl + 'Customer/SaveCustomer'),
        body: jsonEncode(saveCustomer.toJson()), headers: headers);
    //print("Status Code ${response.statusCode}");

    final reponse = json.decode(response.body);
    return SaveUserModelResponse.fromJson(reponse);
  }

  Future<SaveUserModelResponse> saveUser(
      {UserInfoItem saveUserModel}) async {
    var token = await SharedPreferencesHelper.getToken();
    var headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };
    var response = await http.post(Uri.parse(baseurl + 'UserInfo/SaveUserInfo'),
        body: jsonEncode(saveUserModel.toJson()), headers: headers);
    print(saveUserModel.toJson());
    final reponse = json.decode(response.body);
    return SaveUserModelResponse.fromJson(reponse);
  }

  Future<SaveUserModelResponse> updateUser(
      {UserInfoItem updateUserModel}) async {
    var token = await SharedPreferencesHelper.getToken();
    var headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };
    var response = await http.post(Uri.parse(baseurl + 'UserInfo/UpdateUserInfo'),
        body: jsonEncode(updateUserModel.toJsonWithId()), headers: headers);
    print(updateUserModel.toJsonWithId());
    final reponse = json.decode(response.body);
    return SaveUserModelResponse.fromJson(reponse);
  }

  Future<OrderSubmitResponseModel> updateProductInfo(
      {ProductItem product}) async {
    var token = await SharedPreferencesHelper.getToken();
    var headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };
    var response = await http.post(Uri.parse(baseurl + 'Product/UpdateProductInformation'),
        body: jsonEncode(product.toupdateJsonFile()), headers: headers);

    final reponse = json.decode(response.body);
    return OrderSubmitResponseModel.fromJson(reponse);
  }

  Future<OrderSubmitResponseModel> saveProductInfo(
      {ProductItem product}) async {
    var token = await SharedPreferencesHelper.getToken();
    var headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };
    var response = await http.post(Uri.parse(baseurl + 'Product/SaveProduct'),
        body: jsonEncode(product.toJsonWithoutId()), headers: headers);

    final reponse = json.decode(response.body);
    return OrderSubmitResponseModel.fromJson(reponse);
  }

  Future<EmailAccountModel> getAllEmailAccountModel() async {
    var token = await SharedPreferencesHelper.getToken();
    var headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };
    var response = await http.get( Uri.parse(baseurl + 'EmailAccount/GetAllEmailAccount'),
        headers: headers);
    final reponse = json.decode(response.body);
    return EmailAccountModel.fromJson(reponse);
  }

  Future<UpazilaModel> getAllUpazila() async {
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };
    var response = await http.get(Uri.parse(baseurl + 'Upazila/GetAllUpazila'), headers: header);
    final allListItem = UpazilaModel.fromJson(jsonDecode(response.body));

    return allListItem;
  }

  Future<UpazilaModel> getAllUpazilaByUser({userId, userType}) async {
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };
    var response = await http.get(Uri.parse(baseurl + 'Upazila/GetAllUpazilaByUser?id=$userId&userType=$userType'), headers: header);
    final allListItem = UpazilaModel.fromJson(jsonDecode(response.body));
    return allListItem;
  }

  Future<DBOrderSummaryModel> getDBOrderSummary(customerId) async {
    var token = await SharedPreferencesHelper.getToken();
    var headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };
    var response = await http.get(Uri.parse(baseurl + 'OrderDB/GetDBOrderSummary?customerId=$customerId'),
        headers: headers);
    final reponse = json.decode(response.body);
    return DBOrderSummaryModel.fromJson(reponse);
  }

  Future<DBOrderItemSummaryModel> getDBOrderItemSummary(customerId) async {
    var token = await SharedPreferencesHelper.getToken();
    var headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };
    var response = await http.get(Uri.parse(baseurl + 'OrderDB/GetDBOrderItemSummary?customerId=$customerId'),
        headers: headers);
    final reponse = json.decode(response.body);
    return DBOrderItemSummaryModel.fromJson(reponse);
  }

  Future<UserSearchModel> getUserByType() async {
    var url = Uri.parse(baseurl + 'UserInfo/GetAllUserInfo');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };
    var response = await http.get( url, headers: header, );
    print(response.body.toString());
    final reponse =json.decode(response.body);
    return UserSearchModel.fromJson(reponse);
  }

  Future<BooksModel> getAllBooks() async {
    var url = Uri.parse(baseurl + 'Books/GetAllBooks');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };
    var response = await http.get(url, headers: header,);
    final reponse = json.decode(response.body);
    return BooksModel.fromJson(reponse);
  }

  Future<SchoolItem> getBooksById({id}) async {
    var url = Uri.parse(baseurl + 'Books/GetBooksById?id=$id');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.get(url, headers: header,);

    final reponse = json.decode(response.body);
    return SchoolItem.fromJson(reponse);
  }

  Future<SaveUserModelResponse> saveBooks({BookItem saveBooksItem}) async {
    var url = Uri.parse(baseurl + 'Books/SaveBooks');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };
    var response = await http.post(url, body: jsonEncode(saveBooksItem.toJson()), headers: header,);
    final reponse = json.decode(response.body);
    return SaveUserModelResponse.fromJson(reponse);
  }

  Future<SaveUserModelResponse> updateBooks({BookItem updateBooksItem}) async {
    var url = Uri.parse(baseurl + 'Books/UpdateBooks');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.post(url, body: jsonEncode(updateBooksItem.toJsonWithId()), headers: header,);
    final reponse = json.decode(response.body);
    return SaveUserModelResponse.fromJson(reponse);
  }

  Future<AuthorModel> getAllAuthor() async {
    var url = Uri.parse(baseurl + 'Author/GetAllAuthor');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.get(url, headers: header,);
    final reponse = json.decode(response.body);
    return AuthorModel.fromJson(reponse);
  }

  Future<AuthorItem> getAuthorById({id}) async {
    var url = Uri.parse(baseurl + 'Author/GetAuthorById?id=$id');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.get(url, headers: header,);
    final reponse = json.decode(response.body);
    return AuthorItem.fromJson(reponse);
  }

  Future<SaveUserModelResponse> saveAuthor({AuthorItem saveAuthorItem}) async {
    var url = Uri.parse(baseurl + 'Author/SaveAuthor');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.post(url, body: jsonEncode(saveAuthorItem.toJson()), headers: header,);
    final reponse = json.decode(response.body);
    return SaveUserModelResponse.fromJson(reponse);
  }

  Future<SaveUserModelResponse> updateAuthor({AuthorItem updateAuthorItem}) async {
    var url = Uri.parse(baseurl + 'Author/UpdateAuthor');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.post(url, body: jsonEncode(updateAuthorItem.toJsonWithId()), headers: header,);
    final reponse = json.decode(response.body);
    return SaveUserModelResponse.fromJson(reponse);
  }

  Future<PublishersModel> getAllPublishers() async {
    var url = Uri.parse(baseurl + 'Publishers/GetAllPublishers');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.get(url, headers: header,);

    final reponse = json.decode(response.body);
    return PublishersModel.fromJson(reponse);
  }

  Future<PublishersItem> getPublishersById({id}) async {
    var url = Uri.parse(baseurl + 'Publishers/GetPublishersById?id=$id');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.get(url, headers: header,);

    final reponse = json.decode(response.body);
    return PublishersItem.fromJson(reponse);
  }

  Future<SaveUserModelResponse> savePublishers({PublishersItem savePublishersItem}) async {
    var url = Uri.parse(baseurl + 'Publishers/SavePublishers');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.post(url, body: jsonEncode(savePublishersItem.toJson()), headers: header,);

    final reponse = json.decode(response.body);
    return SaveUserModelResponse.fromJson(reponse);
  }

  Future<SaveUserModelResponse> updatePublishers({PublishersItem updatePublishersItem}) async {
    var url = Uri.parse(baseurl + 'Publishers/UpdatePublishers');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.post(url, body: jsonEncode(updatePublishersItem.toJsonWithId()), headers: header,);

    final reponse = json.decode(response.body);
    return SaveUserModelResponse.fromJson(reponse);
  }

  Future<CategoryModel> getAllCategoryList() async {
    var url = Uri.parse(baseurl + 'Category/GetAllCategory');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.get(url, headers: header,);

    final reponse = json.decode(response.body);
    return CategoryModel.fromJson(reponse);
  }

  Future<CategoryItem> getCategoryById({id}) async {
    var url = Uri.parse(baseurl + 'Category/GetCategoryById?id=$id');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.get(url, headers: header,);

    final reponse = json.decode(response.body);
    return CategoryItem.fromJson(reponse);
  }

  Future<SaveUserModelResponse> saveCategory({CategoryItem saveCategoryItem}) async {
    var url = Uri.parse(baseurl + 'Category/SaveCategory');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.post(url, body: jsonEncode(saveCategoryItem.toJson()), headers: header,);

    final reponse = json.decode(response.body);
    return SaveUserModelResponse.fromJson(reponse);
  }

  Future<SaveUserModelResponse> updateCategory({CategoryItem updateCategoryItem}) async {
    var url = Uri.parse(baseurl + 'Category/UpdateCategory');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.post(url, body: jsonEncode(updateCategoryItem.toJsonWithId()), headers: header,);

    final reponse = json.decode(response.body);
    return SaveUserModelResponse.fromJson(reponse);
  }

  Future<UserPaymentInfoModel> getAllUserPaymentInfo() async {
    var url = Uri.parse(baseurl + 'UserPaymentInfo/GetAllUserPaymentInfo');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.get(url, headers: header,);

    final reponse = json.decode(response.body);
    return UserPaymentInfoModel.fromJson(reponse);
  }

  Future<UserPaymentInfoItem> getUserPaymentInfoById({id}) async {
    var url = Uri.parse(baseurl + 'UserPaymentInfo/GetUserPaymentInfoById?id=$id');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.get(url, headers: header,);

    final reponse = json.decode(response.body);
    return UserPaymentInfoItem.fromJson(reponse);
  }

  Future<SaveUserModelResponse> saveUserPaymentInfo({UserPaymentInfoItem saveUserPaymentInfoItem}) async {
    var url = Uri.parse(baseurl + 'UserPaymentInfo/SaveUserPaymentInfo');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };
    //print(saveUserPaymentInfoItem.toJson());
    var response = await http.post(url, body: jsonEncode(saveUserPaymentInfoItem.toJson()), headers: header,);

    final reponse = json.decode(response.body);
    return SaveUserModelResponse.fromJson(reponse);
  }

  Future<SaveUserModelResponse> updateUserPaymentInfo({UserPaymentInfoItem updateUserPaymentInfoItem}) async {
    var url = Uri.parse(baseurl + 'UserPaymentInfo/UpdateUserPaymentInfo');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.post(url, body: jsonEncode(updateUserPaymentInfoItem.toJsonWithId()), headers: header,);

    final reponse = json.decode(response.body);
    return SaveUserModelResponse.fromJson(reponse);
  }

  Future<UserInfoModel> getAllUserInfo() async {
    var url = Uri.parse(baseurl + 'UserInfo/GetAllUserInfo');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.get(url, headers: header,);

    final reponse = json.decode(response.body);
    return UserInfoModel.fromJson(reponse);
  }

  Future<UserInfoItem> getUserInfoById({id}) async {
    var url = Uri.parse(baseurl + 'UserInfo/GetUserInfoById?id=$id');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.get(url, headers: header,);

    final reponse = json.decode(response.body);
    return UserInfoItem.fromJson(reponse);
  }

  Future<SaveUserModelResponse> saveUserInfo({UserInfoItem saveUserInfoItem}) async {
    var url = Uri.parse(baseurl + 'UserInfo/SaveUserInfo');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.post(url, body: jsonEncode(saveUserInfoItem.toJson()), headers: header,);

    final reponse = json.decode(response.body);
    return SaveUserModelResponse.fromJson(reponse);
  }

  Future<SaveUserModelResponse> updateUserInfo({UserInfoItem updateUserInfoItem}) async {
    var url = Uri.parse(baseurl + 'UserInfo/UpdateUserInfo');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.post(url, body: jsonEncode(updateUserInfoItem.toJsonWithId()), headers: header,);
    print(updateUserInfoItem.toJsonWithId());
    print(response.body.toString());
    final reponse = json.decode(response.body);
    return SaveUserModelResponse.fromJson(reponse);
  }

  Future<SchoolModel> getAllSchool() async {
    var url = Uri.parse(baseurl + 'School/GetAllSchool');
    //var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    };

    var response = await http.get(url, headers: header,);
    final reponse = json.decode(response.body);
    return SchoolModel.fromJson(reponse);
  }

  Future<SchoolItem> getSchoolById({id}) async {
    var url = Uri.parse(baseurl + 'School/GetSchoolById?id=$id');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.get(url, headers: header,);

    final reponse = json.decode(response.body);
    return SchoolItem.fromJson(reponse);
  }

  Future<SaveUserModelResponse> saveSchool({SchoolItem saveSchoolItem}) async {
    var url = Uri.parse(baseurl + 'School/SaveSchool');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.post(url, body: jsonEncode(saveSchoolItem.toJson()), headers: header,);

    final reponse = json.decode(response.body);
    return SaveUserModelResponse.fromJson(reponse);
  }

  Future<SaveUserModelResponse> updateSchool({SchoolItem updateSchoolItem}) async {
    var url = Uri.parse(baseurl + 'School/UpdateSchool');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.post(url, body: jsonEncode(updateSchoolItem.toJsonWithId()), headers: header,);

    final reponse = json.decode(response.body);
    return SaveUserModelResponse.fromJson(reponse);
  }

  Future<UploadDataModel> getAllUploadData() async {
    var url = Uri.parse(baseurl + 'UploadData/GetAllUploadData');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.get(url, headers: header,);

    final reponse = json.decode(response.body);
    return UploadDataModel.fromJson(reponse);
  }

  Future<UploadDataItem> getUploadDataById({id}) async {
    var url = Uri.parse(baseurl + 'UploadData/GetUploadDataById?id=$id');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.get(url, headers: header,);

    final reponse = json.decode(response.body);
    return UploadDataItem.fromJson(reponse);
  }

  Future<SaveUserModelResponse> saveUploadData({UploadDataItem saveUploadDataItem}) async {
    var url = Uri.parse(baseurl + 'UploadData/SaveUploadData');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.post(url, body: jsonEncode(saveUploadDataItem.toJson()), headers: header,);

    final reponse = json.decode(response.body);
    return SaveUserModelResponse.fromJson(reponse);
  }

  Future<SaveUserModelResponse> updateUploadData({UploadDataItem updateUploadDataItem}) async {
    var url = Uri.parse(baseurl + 'UploadData/UpdateUploadData');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.post(url, body: jsonEncode(updateUploadDataItem.toJsonWithId()), headers: header,);

    final reponse = json.decode(response.body);
    return SaveUserModelResponse.fromJson(reponse);
  }

  Future<FileUploadInfoModel> getAllFileUploadInfo() async {
    var url = Uri.parse(baseurl + 'FileUploadInfo/GetAllFileUploadInfo');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.get(url, headers: header,);

    final reponse = json.decode(response.body);
    return FileUploadInfoModel.fromJson(reponse);
  }

  Future<FileUploadInfoItem> getFileUploadInfoById({id}) async {
    var url = Uri.parse(baseurl + 'FileUploadInfo/GetFileUploadInfoById?id=$id');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.get(url, headers: header,);

    final reponse = json.decode(response.body);
    return FileUploadInfoItem.fromJson(reponse);
  }

  Future<SaveUserModelResponse> saveFileUploadInfo({FileUploadInfoItem saveFileUploadInfoItem}) async {
    var url = Uri.parse(baseurl + 'FileUploadInfo/SaveFileUploadInfo');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.post(url, body: jsonEncode(saveFileUploadInfoItem.toJson()), headers: header,);

    final reponse = json.decode(response.body);
    return SaveUserModelResponse.fromJson(reponse);
  }

  Future<SaveUserModelResponse> updateFileUploadInfo({FileUploadInfoItem updateFileUploadInfoItem}) async {
    var url = Uri.parse(baseurl + 'FileUploadInfo/UpdateFileUploadInfo');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };

    var response = await http.post(url, body: jsonEncode(updateFileUploadInfoItem.toJsonWithId()), headers: header,);

    final reponse = json.decode(response.body);
    return SaveUserModelResponse.fromJson(reponse);
  }

  Future<UserSearchModelItem> getUserByMobileNo({mobileNo, requestedId}) async {
    var url = Uri.parse(baseurl + 'Common/GetUserByMobileNo?mobileNo=$mobileNo&requestedId=$requestedId');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };
    var response = await http.get(
      url,
      headers: header,
    );

    final userSearchModel = UserSearchModelItem.fromJson(jsonDecode(response.body));
    return userSearchModel;
  }

  Future<SaveUserModelResponse> updateUserPassword({id, newPassword}) async {
    var url = Uri.parse(baseurl + 'Common/UpdateUserPassword?id=$id&newPassword=$newPassword');
    var token = await SharedPreferencesHelper.getToken();
    var headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };
    var response = await http.post(url, headers: headers);

    final reponse = json.decode(response.body);
    return SaveUserModelResponse.fromJson(reponse);
  }

  Future<DashBoardStatus> GetDashBoardHPStatus() async {
    var url = Uri.parse(baseurl + 'TransactionInfo/GetDashBoardHPTestStatus');
    var token = await SharedPreferencesHelper.getToken();
    var header = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'Authorization': "Bearer $token"
    };
    var response = await http.get(
      url,
      headers: header,
    );
    //print(response.body.toString());
    final allWordInfo = DashBoardStatusModel.fromJson(jsonDecode(response.body));
    //print(allWordInfo.dashBoardStatusList.length);
    return allWordInfo.dashBoardStatusList.length > 0 ? allWordInfo.dashBoardStatusList[0] : new DashBoardStatus();
  }
}
