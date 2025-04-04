import type { ColorSchemeName } from '../../types/beatmap/shared/colorScheme.ts';
import type { EnvironmentAllName } from '../../types/beatmap/shared/environment.ts';
import type { IColorScheme } from '../../types/beatmap/v2/custom/colorScheme.ts';
import type { IWrapInfoColorScheme } from '../../types/beatmap/wrapper/info.ts';

/** Record of Environment Color to Color Scheme. */
export const EnvironmentSchemeName: {
   readonly [key in EnvironmentAllName]: ColorSchemeName;
} = {
   DefaultEnvironment: 'The First',
   OriginsEnvironment: 'Origins',
   TriangleEnvironment: 'The First',
   NiceEnvironment: 'The First',
   BigMirrorEnvironment: 'The First',
   DragonsEnvironment: 'The First',
   KDAEnvironment: 'KDA',
   MonstercatEnvironment: 'The First',
   CrabRaveEnvironment: 'Crab Rave',
   PanicEnvironment: 'The First',
   RocketEnvironment: 'Rocket',
   GreenDayEnvironment: 'Green Day',
   GreenDayGrenadeEnvironment: 'Green Day',
   TimbalandEnvironment: 'Timbaland',
   FitBeatEnvironment: 'FitBeat',
   LinkinParkEnvironment: 'Linkin Park',
   BTSEnvironment: 'BTS',
   KaleidoscopeEnvironment: 'Kaleidoscope',
   InterscopeEnvironment: 'Interscope',
   SkrillexEnvironment: 'Skrillex',
   BillieEnvironment: 'Billie Eilish',
   HalloweenEnvironment: 'Spooky',
   GagaEnvironment: 'Gaga',
   WeaveEnvironment: 'Weave',
   PyroEnvironment: 'Pyro',
   EDMEnvironment: 'EDM',
   TheSecondEnvironment: 'The Second',
   LizzoEnvironment: 'Lizzo',
   TheWeekndEnvironment: 'The Weeknd',
   RockMixtapeEnvironment: 'Rock Mixtape',
   Dragons2Environment: 'Dragons 2.0',
   Panic2Environment: 'Panic 2.0',
   QueenEnvironment: 'Queen',
   LinkinPark2Environment: 'Linkin Park 2.0',
   TheRollingStonesEnvironment: 'The Rolling Stones',
   LatticeEnvironment: 'Lattice',
   DaftPunkEnvironment: 'Daft Punk',
   HipHopEnvironment: 'Hip Hop Mixtape',
   ColliderEnvironment: 'Collider',
   BritneyEnvironment: 'Britney Spears',
   Monstercat2Environment: 'Monstercat 2.0',
   GlassDesertEnvironment: 'Glass Desert',
   MetallicaEnvironment: 'Metallica',
   MultiplayerEnvironment: 'Origins',
} as const;

/** Custom Color property rename to human readable. */
export const CustomColorRename: {
   readonly [key in keyof Required<IColorScheme>]: string;
} = {
   _colorLeft: 'Left Note Color',
   _colorRight: 'Right Note Color',
   _envColorLeft: 'Left Environment Color',
   _envColorRight: 'Right Environment Color',
   _envColorWhite: 'White Environment Color',
   _envColorLeftBoost: 'Left Environment Boost Color',
   _envColorRightBoost: 'Right Environment Boost Color',
   _envColorWhiteBoost: 'White Environment Boost Color',
   _obstacleColor: 'Obstacle Color',
} as const;

/** Color Scheme property rename to human readable. */
export const ColorSchemeRename: {
   readonly [
      key in keyof Required<
         Omit<IWrapInfoColorScheme, 'name' | 'overrideNotes' | 'overrideLights'>
      >
   ]: string;
} = {
   saberLeftColor: 'Left Note Color',
   saberRightColor: 'Right Note Color',
   environment0Color: 'Left Environment Color',
   environment1Color: 'Right Environment Color',
   environmentWColor: 'White Environment Color',
   environment0ColorBoost: 'Left Environment Boost Color',
   environment1ColorBoost: 'Right Environment Boost Color',
   environmentWColorBoost: 'White Environment Boost Color',
   obstaclesColor: 'Obstacle Color',
} as const;

/** Color scheme definition. */
export const ColorScheme: {
   readonly [key in ColorSchemeName]: Readonly<Omit<IColorScheme, 'a'>>;
} = {
   'Default Custom': {
      _colorLeft: { r: 0.7529412, g: 0.1882353, b: 0.1882353 },
      _colorRight: { r: 0.1254902, g: 0.3921569, b: 0.6588235 },
      _envColorLeft: { r: 0.7529412, g: 0.1882353, b: 0.1882353 },
      _envColorRight: { r: 0.1882353, g: 0.5960785, b: 1 },
      _obstacleColor: { r: 1, g: 0.1882353, b: 0.1882353 },
   },
   'The First': {
      _colorLeft: { r: 0.7843137, g: 0.07843138, b: 0.07843138 },
      _colorRight: { r: 0.1568627, g: 0.5568627, b: 0.8235294 },
      _envColorLeft: { r: 0.85, g: 0.08499997, b: 0.08499997 },
      _envColorRight: { r: 0.1882353, g: 0.675294, b: 1 },
      _obstacleColor: { r: 1, g: 0.1882353, b: 0.1882353 },
   },
   Origins: {
      _colorLeft: { r: 0.6792453, g: 0.5712628, b: 0 },
      _colorRight: { r: 0.7075472, g: 0, b: 0.5364411 },
      _envColorLeft: { r: 0.4910995, g: 0.6825916, b: 0.7 },
      _envColorRight: { r: 0.03844783, g: 0.6862745, b: 0.9056604 },
      _obstacleColor: { r: 0.06167676, g: 0.2869513, b: 0.3962264 },
   },
   KDA: {
      _colorLeft: { r: 0.6588235, g: 0.2627451, b: 0.1607843 },
      _colorRight: { r: 0.5019608, g: 0.08235294, b: 0.572549 },
      _envColorLeft: { r: 1, g: 0.3960785, b: 0.2431373 },
      _envColorRight: { r: 0.7607844, g: 0.1254902, b: 0.8666667 },
      _obstacleColor: { r: 1, g: 0.3960785, b: 0.2431373 },
   },
   'Crab Rave': {
      _colorLeft: { r: 0, g: 0.7130001, b: 0.07806564 },
      _colorRight: { r: 0.04805952, g: 0.5068096, b: 0.734 },
      _envColorLeft: { r: 0.134568, g: 0.756, b: 0.1557533 },
      _envColorRight: { r: 0.05647058, g: 0.6211764, b: 0.9 },
      _envColorLeftBoost: { r: 0.1333333, g: 0.7568628, b: 0.1568628 },
      _envColorRightBoost: { r: 0.05490196, g: 0.6196079, b: 0.9019608 },
      _obstacleColor: { r: 0, g: 0.8117648, b: 0.09019608 },
   },
   Noir: {
      _colorLeft: { r: 0.1792453, g: 0.1792453, b: 0.1792453 },
      _colorRight: { r: 0.5943396, g: 0.5943396, b: 0.5943396 },
      _envColorLeft: { r: 0.4056604, g: 0.4056604, b: 0.4056604 },
      _envColorRight: { r: 0.6037736, g: 0.6037736, b: 0.6037736 },
      _obstacleColor: { r: 0.2358491, g: 0.2358491, b: 0.2358491 },
   },
   Rocket: {
      _colorLeft: { r: 1, g: 0.4980392, b: 0 },
      _colorRight: { r: 0, g: 0.5294118, b: 1 },
      _envColorLeft: { r: 0.9, g: 0.4866279, b: 0.3244186 },
      _envColorRight: { r: 0.4, g: 0.7180724, b: 1 },
      _obstacleColor: { r: 0.3176471, g: 0.6117647, b: 0.7254902 },
   },
   'Green Day': {
      _colorLeft: { r: 0.2588235, g: 0.7843138, b: 0.01960784 },
      _colorRight: { r: 0, g: 0.7137255, b: 0.6705883 },
      _envColorLeft: { r: 0, g: 0.7137255, b: 0.6705883 },
      _envColorRight: { r: 0.2588235, g: 0.7843137, b: 0.01960784 },
      _obstacleColor: { r: 0, g: 0.8117648, b: 0.09019608 },
   },
   Timbaland: {
      _colorLeft: { r: 0.5019608, g: 0.5019608, b: 0.5019608 },
      _colorRight: { r: 0.1, g: 0.5517647, b: 1 },
      _envColorLeft: { r: 0.1, g: 0.5517647, b: 1 },
      _envColorRight: { r: 0.1, g: 0.5517647, b: 1 },
      _obstacleColor: { r: 0.5, g: 0.5, b: 0.5 },
   },
   FitBeat: {
      _colorLeft: { r: 0.8000001, g: 0.6078432, b: 0.1568628 },
      _colorRight: { r: 0.7921569, g: 0.1607843, b: 0.682353 },
      _envColorLeft: { r: 0.8, g: 0.5594772, b: 0.5594772 },
      _envColorRight: { r: 0.5594772, g: 0.5594772, b: 0.8 },
      _obstacleColor: { r: 0.2784314, g: 0.2784314, b: 0.4 },
   },
   'Linkin Park': {
      _colorLeft: { r: 0.6627451, g: 0.1643608, b: 0.1690187 },
      _colorRight: { r: 0.3870196, g: 0.5168997, b: 0.5568628 },
      _envColorLeft: { r: 0.7529412, g: 0.672753, b: 0.5925647 },
      _envColorRight: { r: 0.6241197, g: 0.6890281, b: 0.709 },
      _envColorLeftBoost: { r: 0.922, g: 0.5957885, b: 0.255394 },
      _envColorRightBoost: { r: 0.282353, g: 0.4586275, b: 0.6235294 },
      _obstacleColor: { r: 0.6627451, g: 0.1647059, b: 0.172549 },
   },
   BTS: {
      _colorLeft: { r: 1, g: 0.09019607, b: 0.4059771 },
      _colorRight: { r: 0.8018868, g: 0, b: 0.7517689 },
      _envColorLeft: { r: 0.7843137, g: 0.1254902, b: 0.5010797 },
      _envColorRight: { r: 0.6941177, g: 0.1254902, b: 0.8666667 },
      _envColorLeftBoost: { r: 0.9019608, g: 0.5411765, b: 1 },
      _envColorRightBoost: { r: 0.3490196, g: 0.8078431, b: 1 },
      _obstacleColor: { r: 0.6698113, g: 0.1800908, b: 0.5528399 },
   },
   Kaleidoscope: {
      _colorLeft: { r: 0.6588235, g: 0.1254902, b: 0.1254902 },
      _colorRight: { r: 0.282353, g: 0.282353, b: 0.282353 },
      _envColorLeft: { r: 0.6588235, g: 0.1254902, b: 0.1254902 },
      _envColorRight: { r: 0.4705882, g: 0.4705882, b: 0.4705882 },
      _envColorLeftBoost: { r: 0.5019608, g: 0, b: 0 },
      _envColorRightBoost: { r: 0.4924452, g: 0, b: 0.5372549 },
      _obstacleColor: { r: 0.2509804, g: 0.2509804, b: 0.2509804 },
   },
   Interscope: {
      _colorLeft: { r: 0.7264151, g: 0.6269099, b: 0.3118103 },
      _colorRight: { r: 0.5895709, g: 0.2978884, b: 0.723 },
      _envColorLeft: { r: 0.7242536, g: 0.319804, b: 0.9137255 },
      _envColorRight: { r: 0.7647059, g: 0.7589706, b: 0.7188236 },
      _envColorLeftBoost: { r: 0.7924528, g: 0.4298683, b: 0.4298683 },
      _envColorRightBoost: { r: 0.7038, g: 0.7157449, b: 0.765 },
      _obstacleColor: { r: 0.5882353, g: 0.2980392, b: 0.7215686 },
   },
   Skrillex: {
      _colorLeft: { r: 0.6980392, g: 0.1411765, b: 0.3686275 },
      _colorRight: { r: 0.3293333, g: 0.323, b: 0.38 },
      _envColorLeft: { r: 0.8, g: 0.28, b: 0.5859449 },
      _envColorRight: { r: 0.06525807, g: 0.578, b: 0.5686774 },
      _envColorLeftBoost: { r: 0.8117648, g: 0.3058824, b: 0.3058824 },
      _envColorRightBoost: { r: 0.2784314, g: 0.8, b: 0.4459763 },
      _obstacleColor: { r: 0.1568628, g: 0.6039216, b: 0.6039216 },
   },
   'Billie Eilish': {
      _colorLeft: { r: 0.8, g: 0.6448193, b: 0.432 },
      _colorRight: { r: 0.5480851, g: 0.6127659, b: 0.64 },
      _envColorLeft: { r: 0.8196079, g: 0.442, b: 0.184 },
      _envColorRight: { r: 0.9411765, g: 0.706771, b: 0.5647059 },
      _envColorLeftBoost: { r: 0.8, g: 0, b: 0 },
      _envColorRightBoost: { r: 0.5568628, g: 0.7019608, b: 0.7764707 },
      _obstacleColor: { r: 0.7132531, g: 0.5614098, b: 0.7830189 },
   },
   Spooky: {
      _colorLeft: { r: 0.8196079, g: 0.4980788, b: 0.2770275 },
      _colorRight: { r: 0.3789474, g: 0.3578947, b: 0.4 },
      _envColorLeft: { r: 0.9019608, g: 0.2300923, b: 0 },
      _envColorRight: { r: 0.4600588, g: 0.5688943, b: 0.9294118 },
      _envColorLeftBoost: { r: 0.3376843, g: 0.6320754, b: 0.3369081 },
      _envColorRightBoost: { r: 0.6020907, g: 0.3280082, b: 0.8584906 },
      _obstacleColor: { r: 0.8196079, g: 0.4431373, b: 0.1843137 },
   },
   Gaga: {
      _colorLeft: { r: 0.85, g: 0.4333333, b: 0.7833334 },
      _colorRight: { r: 0.4705882, g: 0.8, b: 0.4078431 },
      _envColorLeft: { r: 0.708, g: 0.649, b: 0.2394706 },
      _envColorRight: { r: 0.894, g: 0.1625455, b: 0.7485644 },
      _envColorLeftBoost: { r: 0.754717, g: 0.3610244, b: 0.2207191 },
      _envColorRightBoost: { r: 0, g: 0.7058824, b: 1 },
      _obstacleColor: { r: 0.9921569, g: 0, b: 0.7719755 },
   },
   'Glass Desert': {
      _colorLeft: { r: 0.6792453, g: 0.5712628, b: 0 },
      _colorRight: { r: 0.7075472, g: 0, b: 0.5364411 },
      _envColorLeft: { r: 0.32222217, g: 0.6111111, b: 0.75 },
      _envColorRight: { r: 0.03844783, g: 0.62239975, b: 0.90566039 },
      _obstacleColor: { r: 0.06167676, g: 0.2869513, b: 0.3962264 },
   },
   Weave: {
      _colorLeft: { r: 0.7843137, g: 0.07843138, b: 0.07843138 },
      _colorRight: { r: 0.1568627, g: 0.5568627, b: 0.8235294 },
      _envColorLeft: { r: 0.85, g: 0.08499997, b: 0.08499997 },
      _envColorRight: { r: 0.1882353, g: 0.675294, b: 1 },
      _envColorLeftBoost: { r: 0.8218409, g: 0.08627451, b: 0.8509804 },
      _envColorRightBoost: { r: 0.6320754, g: 0.6320754, b: 0.6320754 },
      _obstacleColor: { r: 1, g: 0.1882353, b: 0.1882353 },
   },
   Pyro: {
      _colorLeft: { r: 0.5764706, g: 0, b: 0.03921569 },
      _colorRight: { r: 1, g: 0.6705883, b: 0 },
      _envColorLeft: { r: 1, g: 0.1098039, b: 0.2039216 },
      _envColorRight: { r: 0.8862745, g: 0.7372549, b: 0.2627451 },
      _envColorLeftBoost: { r: 1, g: 0, b: 0.1764706 },
      _envColorRightBoost: { r: 0.7647059, g: 0.7647059, b: 0.7647059 },
      _obstacleColor: { r: 0.8490566, g: 0.7037643, b: 0.4285333 },
   },
   EDM: {
      _colorLeft: { r: 0.6320754, g: 0.6320754, b: 0.6320754 },
      _colorRight: { r: 0.1764706, g: 0.6980392, b: 0.8784314 },
      _envColorLeft: { r: 0.08220173, g: 0.7169812, b: 0 },
      _envColorRight: { r: 0, g: 0.3671638, b: 0.7169812 },
      _envColorLeftBoost: { r: 0.735849, g: 0, b: 0.1758632 },
      _envColorRightBoost: { r: 0.4284593, g: 0, b: 0.754717 },
      _obstacleColor: { r: 0.1764706, g: 0.6980392, b: 0.8784314 },
   },
   'The Second': {
      _colorLeft: { r: 0.7843137, g: 0.07843138, b: 0.07843138 },
      _colorRight: { r: 0.1568627, g: 0.5568627, b: 0.8235294 },
      _envColorLeft: { r: 0.85, g: 0.08499997, b: 0.08499997 },
      _envColorRight: { r: 0.1882353, g: 0.675294, b: 1 },
      _envColorLeftBoost: { r: 0.8235294, g: 0.08627451, b: 0.8509804 },
      _envColorRightBoost: { r: 0, g: 1, b: 0.6478302 },
      _obstacleColor: { r: 1, g: 0.1882353, b: 0.1882353 },
   },
   Lizzo: {
      _colorLeft: { r: 1, g: 0.8132076, b: 0.3773585 },
      _colorRight: { r: 0.6705883, g: 0.254902, b: 0.8980392 },
      _envColorLeft: { r: 0.8392157, g: 0.6470588, b: 0.2156863 },
      _envColorRight: { r: 0.8196079, g: 0.2392157, b: 0.8784314 },
      _envColorLeftBoost: { r: 1, g: 0.4, b: 0.5529412 },
      _envColorRightBoost: { r: 0.3686275, g: 0.7960784, b: 1 },
      _obstacleColor: { r: 1, g: 0.5020987, b: 0.1882353 },
   },
   'The Weeknd': {
      _colorLeft: { r: 0.5843138, g: 0.1294118, b: 0.1294118 },
      _colorRight: { r: 0.2235294, g: 0.2901961, b: 0.3294118 },
      _envColorLeft: { r: 1, g: 0.2979701, b: 0.1411765 },
      _envColorRight: { r: 0.1668743, g: 0.3753689, b: 0.7075472 },
      _envColorWhite: { r: 0.8773585, g: 0.8773585, b: 0.8773585 },
      _envColorLeftBoost: { r: 0.9568628, g: 0.6039216, b: 0.1215686 },
      _envColorRightBoost: { r: 0.5254902, g: 0.8274511, b: 0.9921569 },
      _envColorWhiteBoost: { r: 0.9811321, g: 0.9308866, b: 0.8608046 },
      _obstacleColor: { r: 0.9176471, g: 0.2980392, b: 0.007843138 },
   },
   'Rock Mixtape': {
      _colorLeft: { r: 0.6, g: 0.4233, b: 0.042 },
      _colorRight: { r: 0.6006, g: 0.7441199, b: 0.78 },
      _envColorLeft: { r: 0.75, g: 0.12, b: 0.162 },
      _envColorRight: { r: 0.95, g: 0.5820333, b: 0.1615 },
      _envColorLeftBoost: { r: 0.96, g: 0.1344, b: 0.9187202 },
      _envColorRightBoost: { r: 0.378, g: 0.813, b: 0.9 },
      _obstacleColor: { r: 1, g: 1, b: 1 },
   },
   'Dragons 2.0': {
      _colorLeft: { r: 0.7264151, g: 0.6587077, b: 0.2809719 },
      _colorRight: { r: 0.2509804, g: 0.7647059, b: 0.405098 },
      _envColorLeft: { r: 0.01960784, g: 0.9960785, b: 0.06666667 },
      _envColorRight: { r: 0, g: 0.05490196, b: 1 },
      _envColorLeftBoost: { r: 0.9764706, g: 0.03137255, b: 0.01960784 },
      _envColorRightBoost: { r: 1, g: 0.8292086, b: 0.2264151 },
      _obstacleColor: { r: 0.5548979, g: 0.2470588, b: 1 },
   },
   'Panic 2.0': {
      _colorLeft: { r: 0.9019608, g: 0.3333333, b: 0.5686275 },
      _colorRight: { r: 0.1529412, g: 0.5568628, b: 0.4862745 },
      _envColorLeft: { r: 0.6980392, g: 0.1137255, b: 0.372549 },
      _envColorRight: { r: 0.1882353, g: 0.6196079, b: 0.6235294 },
      _envColorWhite: { r: 0.8329412, g: 0.9008105, b: 0.9254902 },
      _envColorLeftBoost: { r: 0.9019608, g: 0.4470589, b: 0.06666667 },
      _envColorRightBoost: { r: 0.6365692, g: 0.4373443, b: 0.8584906 },
      _envColorWhiteBoost: { r: 0.8803849, g: 0.8313726, b: 0.9254902 },
      _obstacleColor: { r: 0.9686275, g: 0.3803922, b: 0.2745098 },
   },
   Queen: {
      _colorLeft: { r: 0.58, g: 0.5675714, b: 0.5551428 },
      _colorRight: { r: 0.5236231, g: 0.1345675, b: 0.6792453 },
      _envColorLeft: { r: 0.9333334, g: 0.6392157, b: 0.1215686 },
      _envColorRight: { r: 0.04313726, g: 0.7176471, b: 0.8980393 },
      _envColorLeftBoost: { r: 0.7686275, g: 0.145098, b: 0.07450981 },
      _envColorRightBoost: { r: 0.4, g: 0.007843138, b: 0.7254902 },
      _obstacleColor: { r: 0.9333334, g: 0.6392157, b: 0.1215686 },
   },
   'Linkin Park 2.0': {
      _colorLeft: { r: 0.6627451, g: 0.1643608, b: 0.1690187 },
      _colorRight: { r: 0.3870196, g: 0.5168997, b: 0.5568628 },
      _envColorLeft: { r: 0.6627451, g: 0.1647059, b: 0.172549 },
      _envColorRight: { r: 0.6235294, g: 0.6901961, b: 0.7098039 },
      _envColorWhite: { r: 0.7529413, g: 0.6745098, b: 0.5921569 },
      _envColorLeftBoost: { r: 0.922, g: 0.5957885, b: 0.255394 },
      _envColorRightBoost: { r: 0.282353, g: 0.4586275, b: 0.6235294 },
      _obstacleColor: { r: 0.6627451, g: 0.1647059, b: 0.172549 },
   },
   'The Rolling Stones': {
      _colorLeft: { r: 0.8980392, g: 0, b: 0.1150319 },
      _colorRight: { r: 0.5254902, g: 0.1333333, b: 0.6784314 },
      _envColorLeft: { r: 0.9529412, g: 0.01176471, b: 0.4039216 },
      _envColorRight: { r: 0.4784314, g: 0.4039216, b: 1 },
      _envColorLeftBoost: { r: 0.5647059, g: 0.4622677, b: 0 },
      _envColorRightBoost: { r: 0.003921554, g: 0.6383545, b: 0.6705883 },
      _obstacleColor: { r: 0.9529412, g: 0.01176471, b: 0.4039216 },
   },
   Lattice: {
      _colorLeft: { r: 0.8392157, g: 0.172549, b: 0.5456773 },
      _colorRight: { r: 0, g: 0.6717121, b: 0.9803922 },
      _envColorLeft: { r: 0.8941177, g: 0.1607843, b: 0.7490196 },
      _envColorRight: { r: 0.1960784, g: 0.5843138, b: 0.7960785 },
      _envColorLeftBoost: { r: 0.5450981, g: 0.1333333, b: 0.8156863 },
      _envColorRightBoost: { r: 0.4039216, g: 0.9176471, b: 0.9176471 },
      _obstacleColor: { r: 0.4685534, g: 0.7095922, b: 1 },
   },
   'Daft Punk': {
      _colorLeft: { r: 0.7215686, g: 0.2254902, b: 0.1803922 },
      _colorRight: { r: 0.1215686, g: 0.6980392, b: 0.6901961 },
      _envColorLeft: { r: 1, g: 0.7017543, b: 0.2515723 },
      _envColorRight: { r: 0.5215687, g: 0.3294118, b: 0.8196079 },
      _envColorWhite: { r: 0.4784314, g: 0.8117647, b: 1 },
      _envColorLeftBoost: { r: 0.8588235, g: 0, b: 0.4784314 },
      _envColorRightBoost: { r: 0, g: 0.8196079, b: 0.8039216 },
      _envColorWhiteBoost: { r: 1, g: 0.834256, b: 0.4874213 },
      _obstacleColor: { r: 0.6068091, g: 0, b: 1 },
   },
   'Hip Hop Mixtape': {
      _colorLeft: { r: 1, g: 0.583857, b: 0.3137255 },
      _colorRight: { r: 0.01542656, g: 0.6132076, b: 0.5896002 },
      _envColorLeft: { r: 0.9137256, g: 0.4941177, b: 0 },
      _envColorRight: { r: 0.05882353, g: 0.8039216, b: 0.1843137 },
      _envColorWhite: { r: 0.8000001, g: 0.7568628, b: 0.7058824 },
      _envColorLeftBoost: { r: 0.1411765, g: 1, b: 0.9686275 },
      _envColorRightBoost: { r: 0.227451, g: 0.2745098, b: 1 },
      _envColorWhiteBoost: { r: 0.8784314, g: 0.8784314, b: 0.8784314 },
      _obstacleColor: { r: 1, g: 0.3137255, b: 0.5529412 },
   },
   Collider: {
      _colorLeft: { r: 0.9647059, g: 0.4947137, b: 0.1504941 },
      _colorRight: { r: 0.1686274, g: 0.5998134, b: 0.8588235 },
      _envColorLeft: { r: 0.9637059, g: 0.4092787, b: 0 },
      _envColorRight: { r: 0.1686275, g: 0.3921569, b: 0.8588236 },
      _envColorLeftBoost: { r: 0.8980393, g: 0.03529412, b: 0.02352941 },
      _envColorRightBoost: { r: 0.854902, g: 0.4117647, b: 0.9725491 },
      _obstacleColor: { r: 0.8396226, g: 0.09639232, b: 0 },
   },
   'Britney Spears': {
      _colorLeft: { r: 0.9137255, g: 0.1411765, b: 0.6008013 },
      _colorRight: { r: 0.2484275, g: 0.578789, b: 1 },
      _envColorLeft: { r: 0.9921569, g: 0.01176471, b: 0.9882353 },
      _envColorRight: { r: 0.1921569, g: 0.5058824, b: 0.9058824 },
      _envColorLeftBoost: { r: 1, g: 0.4591194, b: 0.5087922 },
      _envColorRightBoost: { r: 0.482353, g: 0.9294118, b: 0.7960785 },
      _obstacleColor: { r: 0.8396226, g: 0.09639232, b: 0 },
   },
   'Monstercat 2.0': {
      _colorLeft: { r: 0.8745099, g: 0.3450981, b: 0.5215687 },
      _colorRight: { r: 0.3882353, g: 0.3019608, b: 0.6117647 },
      _envColorLeft: { r: 0.6196079, g: 0.0509804, b: 0.8274511 },
      _envColorRight: { r: 0.3372549, g: 0.7137255, b: 0.1098039 },
      _envColorLeftBoost: { r: 0.7137255, g: 0.1098039, b: 0.1098039 },
      _envColorRightBoost: { r: 0.08627451, g: 0.5490196, b: 0.6470588 },
      _obstacleColor: { r: 0.2313726, g: 0.1490196, b: 0.6392157 },
   },
   Metallica: {
      _colorLeft: { r: 0.282353, g: 0.3333333, b: 0.4039216 },
      _colorRight: { r: 0.5764706, g: 0.7176471, b: 0.8235294 },
      _envColorLeft: { r: 0.8666667, g: 0.4941176, b: 0.3803922 },
      _envColorRight: { r: 0.254902, g: 0.454902, b: 0.8666667 },
      _envColorWhite: { r: 0.5137255, g: 0.6078314, b: 0.6784314 },
      _envColorLeftBoost: { r: 0.8588235, g: 0.3921569, b: 0.09803922 },
      _envColorRightBoost: { r: 0, g: 0.7490196, b: 0.6313726 },
      _envColorWhiteBoost: { r: 0.5137255, g: 0.6078314, b: 0.6784314 },
      _obstacleColor: { r: 0.8392157, g: 0.09803922, b: 0 },
   },
} as const;

/**
 * Color scheme variants that overlays on top of the base color scheme.
 */
// Commented as it is disabled via the override tag
export const ColorSchemeVariant: {
   readonly [key in ColorSchemeName]?: {
      readonly [key: string]: Readonly<Omit<IColorScheme, 'a'>>;
   };
} = {
   Metallica: {
      Battery: {
         _envColorLeftBoost: { r: 0.5215687, g: 0.7450981, b: 0 },
         _envColorRightBoost: { r: 0.3960784, g: 0.003921569, b: 0.7411765 },
      },
      'Creeping Death': {
         // _colorLeft: { r: 0.2666667, g: 0.3490196, b: 0.4666667 },
         // _colorRight: { r: 0.5764706, g: 0.7176471, b: 0.8235294 },
         _envColorLeftBoost: { r: 0.8980392, g: 0.03529412, b: 0.02352941 },
         _envColorRightBoost: { r: 0.6078432, g: 0.003921569, b: 0.7411765 },
      },
      'Enter Sandman': {
         _envColorLeftBoost: { r: 0.8980392, g: 0.03529412, b: 0.02352941 },
         _envColorRightBoost: { r: 0.5411765, g: 0.07450981, b: 0.7764706 },
      },
      'Fade to Black': {
         _envColorLeftBoost: { r: 0.8823529, g: 0, b: 0.01960784 },
         _envColorRightBoost: { r: 0.4666667, g: 0, b: 0.7803922 },
      },
      Fuel: {
         _envColorLeftBoost: { r: 0.7607843, g: 0.01568628, b: 0.02352941 },
         _envColorRightBoost: { r: 0.8509804, g: 0.4392157, b: 0.07843138 },
      },
      'Hit the Lights': {
         _envColorLeftBoost: { r: 0.8980392, g: 0.03529412, b: 0.02352941 },
         _envColorRightBoost: { r: 0.1686275, g: 0.7254902, b: 0.2196078 },
      },
      'King Nothing': {
         // _colorLeft: { r: 0.5764706, g: 0.7176471, b: 0.8235294 },
         // _colorRight: { r: 0.282353, g: 0.3333333, b: 0.4039216 },
         _envColorLeftBoost: { r: 0.7568628, g: 0, b: 0.07843138 },
         _envColorRightBoost: { r: 0.8745098, g: 0.7568628, b: 0 },
      },
      'Lux Æterna': {
         // _colorLeft: { r: 0.5764706, g: 0.7176471, b: 0.8235294 },
         // _colorRight: { r: 0.282353, g: 0.3333333, b: 0.4039216 },
         _envColorLeftBoost: { r: 0.8980392, g: 0.03529412, b: 0.02352941 },
         _envColorRightBoost: { r: 0.8980392, g: 0.7333333, b: 0.02352941 },
      },
      'Nothing Else Matters': {
         _envColorLeftBoost: { r: 0.5764706, g: 0.03137255, b: 0.8745098 },
         _envColorRightBoost: { r: 0.282353, g: 0.5647059, b: 0.3294118 },
      },
      One: {
         // _colorLeft: { r: 0.5764706, g: 0.7176471, b: 0.8235294 },
         // _colorRight: { r: 0.282353, g: 0.3333333, b: 0.4039216 },
         _envColorLeftBoost: { r: 0.7411765, g: 0.003921569, b: 0.1411765 },
         _envColorRightBoost: { r: 0.003921569, g: 0.7411765, b: 0.6039216 },
      },
      'Sad But True': {
         _envColorLeftBoost: { r: 0.8980392, g: 0.03529412, b: 0.02352941 },
         _envColorRightBoost: { r: 0.4, g: 0.4039216, b: 0.9490196 },
      },
      'The Unforgiven': {
         _envColorLeftBoost: { r: 0.8980392, g: 0.03529412, b: 0.02352941 },
         _envColorRightBoost: { r: 0.1686275, g: 0.8588235, b: 0.8470588 },
      },
   },
};
