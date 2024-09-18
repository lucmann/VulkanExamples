#version 450

#extension GL_ARB_separate_shader_objects : enable
#extension GL_ARB_shading_language_420pack : enable

layout (binding = 1) uniform sampler2DMS samplerPosition;
layout (binding = 2) uniform sampler2DMS samplerNormal;
layout (binding = 3) uniform sampler2DMS samplerAlbedo;

layout (location = 0) in vec3 inUV;

layout (location = 0) out vec4 outFragColor;

#define NUM_SAMPLES 8

vec4 resolve(sampler2DMS tex, ivec2 uv)
{
	vec4 result = vec4(0.0);	   
	int count = 0;
	for (int i = 0; i < NUM_SAMPLES; i++)
	{
		vec4 val = texelFetch(tex, uv, i); 
		result += val;
		count++;
	}    
	return result / float(NUM_SAMPLES);
}

vec4 nearest_filter(sampler2DMS tex, ivec2 uv)
{
	// texel coord range [0, 480] in x-axis, so sampling every other texel horizontally
	// is enough to filter the entire of 960x540 image
	if (uv.x < 480)
		return texelFetch(tex, uv * ivec2(2, 1), 0);
}

void main() 
{
	ivec2 attDim = textureSize(samplerPosition);
	// attDim.x = 960 and attDim.y = 540
	// convert normalized texture coordinate to texel coordinate
	// at the same time, double the dimension
	ivec2 UV = ivec2(inUV.st * attDim * 2.0);

	highp int index = 0;
	// upper right
	if (inUV.s > 0.5 && inUV.s < 0.75)
	{
		index = 3;
		UV.s -= 960;
	}
	if (inUV.s > 0.75)
	{
		index = 3;
		UV.s -= 1440;
	}

	// lower left
	if (inUV.t > 0.5)
	{
		index = 2;
		UV.t -= 540;
	}

	vec3 components[4];
	components[0] = resolve(samplerPosition, UV).rgb;  
	components[1] = resolve(samplerNormal, UV).rgb;  
	components[2] = resolve(samplerAlbedo, UV).rgb;  
	components[3] = nearest_filter(samplerAlbedo, UV).rgb;
	// Uncomment to display specular component
	//components[2] = vec3(texture(samplerAlbedo, inUV.st).a);  
	
	// Select component depending on UV
	outFragColor.rgb = components[index];
}