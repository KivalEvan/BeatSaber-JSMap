# Changelog

## 1.0.4 [2022-06-14]

## Fixed

- `time` instead of `type` for custom events

## 1.0.3 [2022-06-13]

## Fixed

- Difficulty file name not being saved

## 1.0.2 [2022-06-12]

### Added

- Selector extension
  - Select object at time and between time
- Class object clone method

### Changed

- Custom data will now always exist in class object context
- Heck settings setter now allow for any valid field

### Updated

- Several extensions fixed

## 1.0.1 [2022-06-11]

### Added

- File name saved to difficulty class object
  - Saving difficulty will prioritise file name from explicit option `filePath`, class object, info, and default value

### Updated

- Point definitions v2 to v3 conversion

### Removed

- `fileName` field removed from difficulty list interface due to redundancy (`settings` field already provided file
  name)

## 1.0.0 - First stable release [2022-06-07]
