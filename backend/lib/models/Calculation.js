'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Calculation', {
    number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    post: DataTypes.STRING,
    country: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    phoneNumber2: DataTypes.STRING,
    dateFrom: DataTypes.DATE,
    dateTo: DataTypes.DATE,
    discount: DataTypes.DECIMAL(10,2),
    booking: DataTypes.BOOLEAN,
    order: DataTypes.STRING,
    dateOrder: DataTypes.DATE,
    assembleDate:  DataTypes.DATE,
    disassembleDate:  DataTypes.DATE,
    assemblePhone:  DataTypes.DATE,
    assembleContact: DataTypes.STRING,
    executionContact: DataTypes.STRING,
    greetings: DataTypes.STRING,
    technician: DataTypes.STRING,
    desc: DataTypes.TEXT
  });
};

//KAL_ID,KAL_Nazev,KAL_Firma,KAL_Kontakt,KAL_Adresa,KAL_Obec,KAL_PSC,KAL_Telefon,KAL_TelefonII,KAL_Fax,KAL_Popis,
//KAL_Od,KAL_Do,
//KAL_Blokace,KAL_Vychozi,KAL_Sleva,KAL_Kalkulace,KAL_Termin,KAL_Objednavka,KAL_ObjednavkaDne,KAL_Info,
//KAL_Faktura,KAL_Vystaveno,KAL_Plneni,KAL_Splatnost,KAL_FormaUhrady,KAL_Montaz,
//KAL_Demontaz,KAL_KontaktMontaz,KAL_TelefonMontaz,KAL_Barva,KAL_Vyřizuje,KAL_Vyhotoveno,KAL_Pozdrav,
//KAL_Detailne,KAL_TextFaktura,KAL_MontazDruh,KAL_Cislo,KAL_Technik,KAL_BarvaMont
