# Changeloger Plugin - Complete Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Installation & Setup](#installation--setup)
3. [Core Features](#core-features)
4. [Plugin Architecture](#plugin-architecture)
5. [Workflow & How It Works](#workflow--how-it-works)
6. [Features Explained](#features-explained)
7. [Admin Dashboard](#admin-dashboard)
8. [Block Customization](#block-customization)
9. [FAQ & Troubleshooting](#faq--troubleshooting)

---

## Introduction

**Changeloger** is a powerful WordPress plugin designed to transform plain text changelogs into visually stunning, interactive changelog representations within the WordPress block editor. It's the ultimate solution for software developers, product managers, and website owners who want to present software updates and changes in an engaging, user-friendly format.

### Key Information
- **Plugin Name:** Changeloger
- **Plugin Type:** Gutenberg Block Plugin
- **Author:** spider-themes
- **Version:** 1.1.1
- **Minimum WordPress Version:** 6.0
- **Tested Up To:** 6.7.2
- **Minimum PHP Version:** 7.4
- **License:** GPLv2 or later

---

## Installation & Setup

### Step 1: Installation
1. Navigate to **WordPress Admin Dashboard**
2. Go to **Plugins → Add New**
3. Search for **"Changeloger"**
4. Click **Install Now** button
5. Click **Activate** to activate the plugin

Alternatively, you can:
- Upload the plugin folder to `/wp-content/plugins/changeloger` via FTP
- Go to **Plugins** in the WordPress admin
- Find Changeloger and click **Activate**

### Step 2: Accessing Changeloger
Once activated, you'll see a new **"Changeloger"** menu item in the WordPress admin sidebar with three sub-sections:
- **Dashboard** - Overview and quick stats
- **Usage Table** - See all posts/pages using Changeloger blocks
- **Settings** - Configure default plugin behavior

### Step 3: Initial Configuration
Visit **Changeloger → Settings** to configure:
- Default Pagination (Enabled/Disabled)
- Default Items Per Page (1-100)
- Default Filter Status (Enabled/Disabled)
- Version Tree Display (Enabled/Disabled)

---

## Core Features

### 1. **Two Block Types**

#### Changeloger Block (cha/changeloger)
The standard changelog block that displays changelog entries in a linear format with support for multiple customization options.

#### Tabbed Changeloger Block (cha/tabbed-changeloger)
An advanced block that organizes changelogs into tabs, allowing multiple changelog sets to be displayed in an organized, tabbed interface.

### 2. **Changelog Input Methods**
- **Text Area Input:** Paste or write plain text directly
- **File Upload:** Import existing changelog text files
- **Real-time Preview:** See changes instantly as you edit

### 3. **Smart Parsing**
The plugin includes an intelligent changelog parser that automatically recognizes:
- **Version Numbers:** Extracts version information (1.0.0, v2.1.0, etc.)
- **Dates:** Identifies and extracts dates in various formats
  - MM/DD/YYYY
  - DD-MM-YYYY
  - YYYY-MM-DD
  - DD Month YYYY
- **Change Categories:** Automatically groups changes by category:
  - **New** - New features
  - **Fixed** - Bug fixes
  - **Updated** - Updates
  - **Improved** - Improvements
  - **Tweaked** - Minor tweaks
  - **General** - Uncategorized changes

### 4. **Pagination**
- **Load More Style:** Click a "Load More" button to reveal additional changelog entries
- **Numeric Pagination:** Navigate through pages using numbered buttons
- **Customizable Items Per Page:** Display 1-100 items per page
- **Custom Button Text:** Change "Load More" text to any custom text

### 5. **Filtering & Search** (Pro Feature)
- **Filter by Category:** Filter changelog entries by type (New, Fixed, Updated, etc.)
- **Search Functionality:** Search through changelog content
- **Adjustable Filter Position:** Place filters on left, center, or right
- **Real-time Filtering:** Updates display instantly

### 6. **Version Management**
- **Version Tree Navigation:** Visual sidebar showing all versions
- **Version Position:** Display on left or right side
- **Click Navigation:** Click any version to jump to it
- **Custom Version Names:** Add custom names to versions

### 7. **Visual Customization**
- **Category Tag Colors:** Customize colors for different change types
  - New tag background color
  - Fixed tag background color
  - Updated tag background color
  - Improved tag background color
  - Tweaked tag background color
- **Pagination Colors:** 
  - Button text color
  - Button background color
  - Active button text color
  - Active button background color
  - Hover button text color
  - Hover button background color
- **Layout Options:** Choose between different changelog display layouts

### 8. **Custom Links**
- **Version Links:** Add custom URLs to version numbers
- **Markdown Link Support:** Parse markdown-style links `[text](url)` in changelog content
- **Interactive Links:** Make changelog entries clickable with external links

### 9. **Mobile Responsive**
All changelogs created with Changeloger are fully responsive and optimized for:
- Desktop displays
- Tablets
- Mobile devices

---

## Plugin Architecture

### Directory Structure

```
changeloger/
├── changeloger.php              # Main plugin file
├── readme.txt                   # Plugin readme
├── admin/                       # Admin pages & functionality
│   ├── class-changeloger-admin.php      # Main admin class
│   ├── class-changeloger-dashboard.php  # Dashboard page
│   ├── class-changeloger-settings.php   # Settings page
│   └── class-changeloger-usage-table.php # Usage tracking
├── includes/                    # Core functionality
│   ├── register-blocks.php      # Block registration
│   └── enqueue-assets.php       # Asset enqueueing
├── build/                       # Compiled block assets
├── script/                      # Frontend JavaScript
│   ├── filter.js                # Frontend filtering
│   ├── frontend.js              # General frontend logic
│   └── tabbed-frontend.js       # Tabbed block frontend
├── languages/                   # Translation files
├── vendor/                      # Composer dependencies (Freemius SDK)
└── package.json                 # Node.js dependencies

```

### Key Classes

#### **Changeloger_Block_Register** (`includes/register-blocks.php`)
Responsible for:
- Registering the Changeloger block type
- Registering the Tabbed Changeloger block type
- Handling render callbacks for blocks
- Enqueuing necessary scripts and styles

#### **Changeloger_Block_Assets** (`includes/enqueue-assets.php`)
Responsible for:
- Registering block editor styles
- Registering frontend JavaScript files
- Enqueuing pagination, filtering, and tab functionality scripts

#### **Changeloger_Admin** (`admin/class-changeloger-admin.php`)
Responsible for:
- Creating admin menu structure
- Managing admin pages (Dashboard, Usage, Settings)
- Providing singleton instance pattern

#### **Changeloger_Dashboard** (`admin/class-changeloger-dashboard.php`)
Responsible for:
- Displaying plugin statistics
- Showing total usage count
- Displaying block type breakdown
- Showing recent changelog usage

#### **Changeloger_Settings** (`admin/class-changeloger-settings.php`)
Responsible for:
- Managing default plugin settings
- Storing user preferences
- Handling settings form submission

---

## Workflow & How It Works

### Step 1: Add Block to Page/Post

1. Open any **Post** or **Page** in the WordPress block editor
2. Click the **"+"** button to add a new block
3. Search for **"Changeloger"** or **"Tabbed Changeloger"**
4. Click to insert the block

### Step 2: Input Changelog Content

The block will display a placeholder with two options:

#### Option A: Paste Plain Text
1. Click **"Paste plain text"** button
2. A text area appears where you can:
   - Paste existing changelog content
   - Type changelog manually
   - Edit content directly

#### Option B: Upload File
1. Click **"Upload file"** button
2. Select a `.txt` file from your computer
3. The file content is automatically parsed

### Step 3: Content Format Recognition

The plugin automatically parses your content. Expected format:

```
Version 1.2.0 - March 15, 2024
**New:**
* Added dark mode support
* Introduced new API endpoints

**Fixed:**
* Resolved login timeout issues
* Fixed memory leaks in core module

Version 1.1.0 - February 10, 2024
**Updated:**
* Improved performance
* Better error handling
```

### Step 4: Visual Preview

As you input content, the editor shows:
- A real-time preview of how the changelog will look
- Color-coded change categories (tags)
- Date and version information
- List of all changes organized by type

### Step 5: Customize Appearance

In the **Inspector Panel** (right side of editor), you can:

1. **Enable/Disable Pagination** - Toggle "Load More" button
2. **Set Items Per Page** - Choose how many items display initially
3. **Customize Colors** - Adjust category tag colors and pagination colors
4. **Enable Versions** - Show version navigation sidebar
5. **Set Version Position** - Left or right side
6. **Enable Filtering** - Allow users to filter by category
7. **Enable Search** - Add search box to changelog
8. **Change Layout** - Select different display layouts

### Step 6: Manage Custom Links

For each version, you can:
1. Add a URL/link to the version number
2. Automatically parse markdown links in change descriptions
3. Link to release pages, GitHub releases, etc.

### Step 7: Configure Pagination

If pagination is enabled:
1. Choose pagination type (Load More or Numeric)
2. Set "Load More" button text
3. Customize button colors:
   - Normal state
   - Hover state
   - Active/current state

### Step 8: Publish

1. Click **"Publish"** or **"Update"** button
2. Your changelog is now live on the website
3. Visitors can interact with filters, search, pagination, etc.

---

## Features Explained

### Feature 1: Intelligent Changelog Parser

**How It Works:**
The `ChangelogParser` class in `src/changeloger/parser.js` uses regex patterns to:

1. **Detect Version Numbers**
   - Pattern: `(\d+(\.\d+){0,3})`
   - Matches: 1.0, 1.0.0, 1.0.0.0, v1.2, etc.

2. **Detect Dates**
   - Recognizes multiple formats
   - Extracts date from version line
   - Stores for display

3. **Detect Change Categories**
   - Looks for `**Category:**` format
   - Looks for `Category: change` or `Category - change` format
   - Looks for bullet points `*`
   - Groups changes automatically

4. **Parse Change Items**
   - Each line under a category becomes a change item
   - Automatically detects and converts markdown links

**Example Parsing:**
```
Input Text:
Version 1.2.0 - March 15, 2024
**New:**
* Feature A
* Feature B

Output Structure:
{
  version: "1.2.0",
  date: "March 15, 2024",
  changes: [
    { category: "New", change: "Feature A" },
    { category: "New", change: "Feature B" }
  ]
}
```

### Feature 2: Pagination System

**How It Works:**

#### Load More Pagination
1. Initially displays configured number of items (default: 10)
2. "Load More" button below changelog
3. Clicking button loads next batch of items
4. Handled by `frontend.js` using jQuery

#### Numeric Pagination
1. Shows numbered buttons (1, 2, 3, etc.)
2. Click a number to go to that page
3. Tracks current page state
4. Smoothly transitions between pages

**Configuration:**
- `enablePagination` - Boolean to enable/disable
- `paginationType` - "load-more" or "numeric"
- `perPage` - Number of items per page
- `paginationLoadMoreText` - Custom button text

**Styling Options:**
- `paginationTextColor` - Button text color
- `paginationBgColor` - Button background
- `paginationHoverBgColor` - Hover state background
- `paginationActiveBgColor` - Current page background

### Feature 3: Filtering System (Pro Feature)

**How It Works:**

1. Displays filter buttons for each change category
2. Clicking a filter shows only changes of that type
3. Multiple filters can be active simultaneously
4. Filter position can be customized

**Filtering Logic:**
```javascript
// Changes are filtered by their category attribute
// Each changelog item has data-filter attribute containing all categories
// When filter is clicked, jQuery shows/hides items based on matching
```

**Components:**
- `FilterButton` component renders filter UI
- `filter.js` handles frontend filtering logic
- Inspector panel allows enabling/disabling filters

### Feature 4: Version Tree Navigation

**How It Works:**

1. When enabled, displays sidebar with all versions
2. Each version is clickable
3. Clicking version scrolls to that section
4. Can be positioned left or right
5. Handled by `VersionsTree` component

**Features:**
- Shows version numbers in order
- Visual indication of current version
- Smooth scrolling to sections
- Custom version names support

### Feature 5: Custom Link Management

**How It Works:**

1. Each version can have a custom URL
2. Supports markdown links in change descriptions: `[text](url)`
3. Automatically converts markdown to HTML links
4. Stored in `customLinks` attribute

**Link Parser Logic:**
```javascript
// Regex finds [text](url) patterns
// Converts to <a href="url">text</a>
// Applied when parsing changelog text
```

### Feature 6: Color Customization

**How It Works:**

1. Uses CSS custom properties (variables)
2. Colors defined in block attributes
3. Applied via inline styles on wrapper
4. Components: `CustomColorControl`, `LogTypeColors`

**Available Color Controls:**
- Individual category tag colors
- Pagination button colors (normal, hover, active states)
- Text colors for all elements

**Implementation:**
```jsx
style={{
  '--changeloger-new-tag-bg-color': newTagColor,
  '--changeloger-fixed-tag-bg-color': fixedTagColor,
  '--changeloger-pagination-bg-color': paginationBgColor,
  // ... more colors
}}
```

### Feature 7: Search Functionality (Pro Feature)

**How It Works:**

1. Adds search input at top of changelog
2. Searches through all changelog text
3. Real-time filtering as user types
4. Case-insensitive search

**Features:**
- Searches through version numbers
- Searches through change descriptions
- Searches through dates
- Updates display instantly

### Feature 8: Tabbed Changeloger Block

**How It Works:**

1. Separate block for organizing multiple changelogs in tabs
2. Each tab contains a complete changelog
3. Click tabs to switch between changelogs
4. Configured via block attributes

**Attributes:**
- `activeTab` - Currently active tab index
- `tabs` - Array of tab objects with title and id
- `tabAlignment` - Tab button alignment (left, center, right)

**Features:**
- Multiple changelogs in one block
- Clean tab interface
- Each tab fully independent
- Customizable tab labels

---

## Admin Dashboard

### Dashboard Page (`Changeloger → Dashboard`)

The dashboard provides quick insights into plugin usage:

#### Statistics Cards

**1. Total Usage**
- Shows how many posts/pages use Changeloger blocks
- Counts both regular and tabbed Changeloger blocks
- Includes published, draft, and pending posts

**2. Block Types**
- Count of regular Changeloger blocks used
- Count of Tabbed Changeloger blocks used
- Quick overview of which block is more popular

#### Quick Actions
- **View Usage Table** - Go to detailed usage tracking
- **Settings** - Access plugin settings
- **Create New Post** - Quick link to add new post

#### Recent Usage Section
Shows the 5 most recently modified posts/pages with:
- Post/page title (clickable to edit)
- Post type (Post, Page, etc.)
- Block type used
- Last modified date

### Usage Table (`Changeloger → Usage Table`)

Detailed table showing:
- **Post/Page Title** - Name of content
- **Post Type** - Post, Page, or Custom Post Type
- **Block Type** - Changeloger or Tabbed Changeloger
- **Date Modified** - When content was last updated
- **Edit Link** - Click to edit the post/page

**Query Logic:**
```sql
SELECT DISTINCT posts from database
WHERE post_content CONTAINS 'wp:cha/changeloger' 
   OR post_content CONTAINS 'wp:cha/tabbed-changeloger'
AND post_status IN ('publish', 'draft', 'private', 'pending')
```

### Settings Page (`Changeloger → Settings`)

Configurable options:

1. **Default Pagination** (Radio buttons)
   - Enabled - All new blocks have pagination by default
   - Disabled - New blocks created without pagination
   - Each block can override this setting

2. **Default Items Per Page** (Number input)
   - Range: 1-100
   - Default: 10
   - Applied to new blocks if pagination enabled

3. **Default Filter** (Radio buttons)
   - Enabled - Filter buttons show by default
   - Disabled - Filters hidden by default
   - Can be toggled per block

4. **Version Tree** (Radio buttons)
   - Enabled - Version sidebar shows by default
   - Disabled - Hidden by default
   - Per-block override available

---

## Block Customization

### Changeloger Block Settings (Inspector Panel)

#### Content Section
- **Changelog Text Area** - Input/edit plain text changelog
- **Upload File Button** - Import from .txt file
- **Show Text Area Toggle** - Switch between edit and preview mode

#### Pagination Section
- **Enable Pagination** - Toggle pagination on/off
- **Pagination Type** - Choose "Load More" or "Numeric"
- **Items Per Page** - Set number (1-100)
- **Load More Button Text** - Custom text for button

#### Pagination Colors
- **Button Text Color** - Normal state text color
- **Button Background Color** - Normal state background
- **Active Text Color** - Current/selected state text
- **Active Background Color** - Current/selected state background
- **Hover Text Color** - Mouseover state text
- **Hover Background Color** - Mouseover state background

#### Category Tag Colors
Click on color squares to customize:
- **New Tag Color** - Changes "New" category tag
- **Fixed Tag Color** - Changes "Fixed" category tag
- **Updated Tag Color** - Changes "Updated" category tag
- **Improved Tag Color** - Changes "Improved" category tag
- **Tweaked Tag Color** - Changes "Tweaked" category tag

#### Versions Section
- **Enable Version Tree** - Toggle version sidebar
- **Version Position** - Left or Right positioning
- **Version Names** - Custom names for each version (pro)

#### Filtering Section (Pro)
- **Enable Filter** - Toggle filter buttons
- **Filter Position** - Left, Center, or Right alignment

#### Search Section (Pro)
- **Enable Search** - Toggle search box
- **Search Placeholder** - Custom search text hint

#### Layout Section
- **Changelog Layout** - Choose display layout style

### Tabbed Changeloger Block Settings

#### Tabs Configuration
- **Add Tab** - Add new changelog tab
- **Remove Tab** - Delete a tab
- **Tab Title** - Edit tab name
- **Tab Content** - Add changelog content to tab

#### Tab Positioning
- **Tab Alignment** - Align tabs left, center, or right

---

## Advanced Features & Customization

### Custom Markdown Format Support

The plugin supports markdown-style links:

```markdown
Version 1.2.0 - March 15, 2024
**New:**
* [Feature with link](https://example.com/feature)
* Regular feature

**Fixed:**
* Bug fix with [GitHub issue](https://github.com/user/repo/issues/123)
```

Links are automatically converted to HTML and rendered as clickable links in the output.

### Custom CSS Classes

The plugin provides class names for custom CSS:
- `.changeloger-container` - Main wrapper
- `.changelog-info-item` - Each changelog entry
- `.changelog-info-item-date` - Version date
- `.changelog-info-item-version` - Version number
- `.changelog-item-category` - Category tag
- `.changeloger-version-list-container` - Version sidebar
- `.changeloger-pagination` - Pagination wrapper
- `.pagination-button` - Individual pagination button

### JavaScript Hooks & Filters

Custom events available for developers:
- `changelogerReady` - Block loaded and ready
- `changelogerFilter` - Filter applied
- `changelogerSearch` - Search executed
- `changelogerPageChange` - Page changed

### Performance Considerations

1. **Large Changelogs**
   - Use pagination for changelogs with 50+ entries
   - Enable filters to help users find relevant changes

2. **Multiple Blocks**
   - Plugin efficiently handles multiple blocks on same page
   - Each block has unique ID for isolated functionality

3. **Mobile Optimization**
   - Pagination essential for mobile devices
   - Filters adapt to smaller screens
   - Version tree collapses on mobile

---

## FAQ & Troubleshooting

### Q: How do I format my changelog text?

**A:** Use one of these formats:

**Format 1: Markdown Style**
```
Version 1.0.0 - January 1, 2024
**New:**
* Feature one
* Feature two

**Fixed:**
* Bug one
```

**Format 2: Traditional Style**
```
Version 1.0.0 - January 1, 2024
New: Feature one
New: Feature two
Fixed: Bug one
```

**Format 3: Bullet Point Style**
```
Version 1.0.0 - January 1, 2024
* Feature one
* Bug one fix
```

### Q: Can I use my existing changelog file?

**A:** Yes! Click the "Upload file" button and select your `.txt` changelog file. The parser will attempt to extract version information and changes automatically.

### Q: What date formats are supported?

**A:** The plugin recognizes:
- MM/DD/YYYY (01/15/2024)
- DD-MM-YYYY (15-01-2024)
- YYYY-MM-DD (2024-01-15)
- DD Month YYYY (15 January 2024)

### Q: How many items should I display per page?

**A:** Recommended based on content:
- **5-10 items** - Mobile-friendly, works for most cases
- **10-20 items** - Good for desktop users
- **20+ items** - Only if you have extensive changelogs

### Q: Can I customize the changelog appearance?

**A:** Yes! Use the Inspector panel to:
- Change category tag colors
- Modify pagination button colors
- Add custom version names
- Choose layout options

### Q: Is Changeloger compatible with all themes?

**A:** Yes! The plugin works with all WordPress themes that support the block editor. CSS is automatically adjusted for your theme.

### Q: Can I use filters without pagination?

**A:** Yes! Filters and pagination are independent features. You can enable:
- Filters without pagination
- Pagination without filters
- Both together
- Neither (simple list view)

### Q: How do I add links to version numbers?

**A:** 
1. Open the block editor
2. In the Inspector panel, find "Custom Links" section
3. Enter the version number and URL
4. Link is automatically applied

Or use markdown syntax: `[Version 1.0.0](https://example.com/v1)`

### Q: What's the difference between Changeloger and Tabbed Changeloger?

**Changeloger:**
- Single changelog display
- Best for one product/project
- More customization options

**Tabbed Changeloger:**
- Multiple changelogs in tabs
- Best for multiple products
- Organized interface
- Cleaner layout for complex scenarios

### Q: Can I search the changelog?

**A:** Yes, but search is a **Pro feature**. Enable it in:
1. Block Editor → Inspector Panel
2. Find "Enable Search" toggle
3. A search box appears above the changelog
4. Users can search through all content

### Q: The parser isn't recognizing my content correctly.

**A:** Ensure:
1. Each version starts with a version number (1.0.0, v2.1, etc.)
2. Optionally include a date after the version
3. Separate categories with `**Category:**` or `Category:` or `Category -`
4. List changes as bullet points `*` or prefixed with category
5. Use consistent formatting throughout

### Q: How do I track changelog usage?

**A:** Visit **Changeloger → Usage Table** to see:
- All posts/pages using Changeloger blocks
- Post type and date modified
- Direct edit links
- Block types used

### Q: Can I migrate from old block name to new?

**A:** The plugin automatically handles migration from:
- Old: `wp:block/changeloger` 
- New: `wp:cha/changeloger`

No action needed - all old blocks are automatically migrated.

### Q: What about mobile responsiveness?

**A:** All features are fully responsive:
- Pagination adapts to screen size
- Filters become more compact
- Version tree collapses on mobile
- Touch-friendly buttons and links
- Full functionality on all devices

### Q: Can I customize the color scheme?

**A:** Yes! You can customize:
- Each change category tag color individually
- All pagination button colors (normal, hover, active)
- Text colors
- Background colors

Colors are set per block, so each changelog can have unique colors.

---

## Support & Additional Resources

For support, visit:
- **Documentation:** Check admin pages and this guide
- **Settings:** Changeloger → Settings in WordPress admin
- **Usage Tracking:** Changeloger → Usage Table

### Key Admin Pages Reference
- Dashboard: `wp-admin/admin.php?page=changeloger`
- Usage: `wp-admin/admin.php?page=changeloger-usage`
- Settings: `wp-admin/admin.php?page=changeloger-settings`

---

## Version History

### Version 1.1.1
- Current stable version
- Full block editor support
- Admin dashboard included
- Usage tracking enabled
- Multiple feature sets

---

**Last Updated:** 2025
**Plugin Status:** Active Development


