import { gql } from "apollo-server";

export default gql`
  scalar FileUpload
  scalar Date
  scalar Time
  scalar DateTime
  scalar Hexadecimal
  scalar UtcOffset
  scalar EmailAddress
  scalar NegativeFloat
  scalar NegativeInt
  scalar NonNegativeFloat
  scalar NonNegativeInt
  scalar NonPositiveFloat
  scalar NonPositiveInt
  scalar PhoneNumber
  scalar PositiveFloat
  scalar PositiveInt
  scalar PostalCode
  scalar UnsignedFloat
  scalar UnsignedInt
  scalar URL
  scalar ObjectID
  scalar BigInt
  scalar Long
  scalar SafeInt
  scalar GUID
  scalar HexColorCode
  scalar HSL
  scalar HSLA
  scalar IPv4
  scalar IPv6
  scalar ISBN
  scalar MAC
  scalar Port
  scalar RGB
  scalar RGBA
  scalar Timestamp
  scalar USCurrency
  scalar Currency
  scalar JSON
  scalar JSONObject
  scalar Byte
  scalar IBAN
  scalar Void
`;
