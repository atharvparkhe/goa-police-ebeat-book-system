from shapely import wkt
from shapely.ops import linemerge, unary_union, polygonize


def divide_region(pol, lin):
    try:
        po = wkt.loads(pol)
        li = wkt.loads(lin)
        merged = linemerge([po.boundary, li])
        borders = unary_union(merged)
        polygons = polygonize(borders)
        for p in polygons:
            print("@@@@@@@@@@@")
            print(p)
            print("@@@@@@@@@@@")
    except Exception as e:
        print(e)


