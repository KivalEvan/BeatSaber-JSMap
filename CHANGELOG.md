# Changelog

## 1.0.2 [2022-06-x]

### Added

-   Selector extension
    -   Select object at time and between time

### Changed

-   Custom data will now always exist in class object context.
-   Heck settings setter now allow for any valid field.

## 1.0.1 [2022-06-11]

### Added

-   File name saved to difficulty class object
    -   Saving difficulty will prioritise file name from explicit option `filePath`, class object, info, and default value.

### Updated

-   Point definitions v2 to v3 conversion

### Removed

-   `fileName` field removed from difficulty list interface due to redundancy (`settings` field already provided file
    name)

## 1.0.0 - First stable release [2022-06-07]