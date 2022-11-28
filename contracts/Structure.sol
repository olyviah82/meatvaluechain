// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

library Structure {
    enum State {
        Manufactured,
        PurchasedByThirdParty,
        ShippedByFarmer,
        ReceivedByThirdParty,
        PurchasedByCustomer,
        ShippedByThirdParty,
        ReceivedByDeliveryHub,
        ShippedByDeliveryHub,
        ReceivedByCustomer
    }
    struct FarmDetails {
        address farmer;
        string farmerName;
        string farmerDetails;
        string farmerLongitude;
        string farmerLatitude;
        uint256 manufacturedDate;
    }
    struct ProductDetails {
        string productType;
        string SlaughterHouse;
        string AverageWeight;
        uint256 Age;
        string CarcassWeight;
        string VetId;
        uint256 productCode;
        uint256 productPrice;
        string productCategory;
    }
    struct ThirdPartyDetails {
        address thirdParty;
        string thirdPartyLongitude;
        string thirdPartyLatitude;
    }
    struct DeliveryHubDetails {
        address deliveryHub;
        string deliveryHubLongitude;
        string deliveryHubLatitude;
    }
    struct Product {
        uint256 uid;
        uint256 sku;
        address owner;
        State productState;
        FarmDetails farmer;
        ThirdPartyDetails thirdparty;
        ProductDetails productdet;
        DeliveryHubDetails deliveryhub;
        address customer;
        string transaction;
    }

    struct ProductHistory {
        Product[] history;
    }

    struct Roles {
        bool Farmer;
        bool ThirdParty;
        bool DeliveryHub;
        bool Customer;
    }
}
